
import { getSentinelHubToken } from "./sentinelHub.service.js";

const STATISTICS_API_URL =
  "https://sh.dataspace.copernicus.eu/api/v1/statistics";

const NDVI_STATISTICS_EVALSCRIPT = `
//VERSION=3

function setup() {
  return {
    input: [
      {
        bands: ["B04", "B08", "SCL", "dataMask"]
      }
    ],
    output: [
      {
        id: "ndvi",
        bands: 1,
        sampleType: "FLOAT32"
      },
      {
        id: "dataMask",
        bands: 1
      }
    ]
  };
}

function evaluatePixel(sample) {
  const scl = sample.SCL;

  // Exclude no-data, defective pixels, shadows,
  // cloud shadows, clouds, cirrus and snow/ice.
  const invalidClasses = [0, 1, 3, 8, 9, 10, 11];

  const valid =
    sample.dataMask === 1 &&
    !invalidClasses.includes(scl);

  const denominator = sample.B08 + sample.B04;

  if (!valid || denominator === 0) {
    return {
      ndvi: [0],
      dataMask: [0]
    };
  }

  const ndvi =
    (sample.B08 - sample.B04) / denominator;

  return {
    ndvi: [ndvi],
    dataMask: [1]
  };
}
`;

export async function getNDVIStatistics(boundary) {
  if (
    boundary?.type !== "Polygon" ||
    !Array.isArray(boundary.coordinates) ||
    !boundary.coordinates[0]?.length
  ) {
    throw new Error("A valid farm boundary is required.");
  }

  const token = await getSentinelHubToken();

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  const requestBody = {
    input: {
      bounds: {
        geometry: boundary,
        properties: {
          crs: "http://www.opengis.net/def/crs/OGC/1.3/CRS84"
        }
      },
      data: [
        {
          type: "sentinel-2-l2a",
          dataFilter: {
            timeRange: {
              from: startDate.toISOString(),
              to: endDate.toISOString()
            },
            maxCloudCoverage: 40,
            mosaickingOrder: "leastCC"
          }
        }
      ]
    },
    aggregation: {
      timeRange: {
        from: startDate.toISOString(),
        to: endDate.toISOString()
      },
      aggregationInterval: {
        of: "P30D"
      },
      resx: 0.0001,
      resy: 0.0001,
      evalscript: NDVI_STATISTICS_EVALSCRIPT
    },
    calculations: {
      ndvi: {
        statistics: {
          default: {
            percentiles: {
              k: [10, 50, 90]
            }
          }
        }
      }
    }
  };

  const response = await fetch(STATISTICS_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(requestBody)
  });

  const result = await response.json();

  if (!response.ok) {
    console.error(
  "SENTINEL HUB DETAILED ERROR:",
  JSON.stringify(result, null, 2)
);

    throw new Error(
      `NDVI statistics request failed with status ${response.status}.`
    );
  }

  const interval = result.data?.[0];
  const stats =
    interval?.outputs?.ndvi?.bands?.B0?.stats;

  if (
    !stats ||
    !Number.isFinite(stats.mean) ||
    !Number.isFinite(stats.min) ||
    !Number.isFinite(stats.max)
  ) {
    throw new Error(
      "No valid NDVI statistics were returned for this period."
    );
  }

  return {
    mean: stats.mean,
    minimum: stats.min,
    maximum: stats.max,
    standardDeviation: stats.stDev ?? null,
    sampleCount: stats.sampleCount ?? null,
    noDataCount: stats.noDataCount ?? null,
    period: interval.interval,
    source: "Sentinel-2 L2A",
    resolutionMeters: 10
  };
}
