
import { getSentinelHubToken } from "./sentinelHub.service.js";

const PROCESS_API_URL =
  "https://sh.dataspace.copernicus.eu/api/v1/process";

const NDVI_EVALSCRIPT = `
// DHARA_NDVI_OVERLAY_TEST_V2
//VERSION=3

function setup() {
  return {
    input: [
      {
        bands: [
          "B02",
          "B03",
          "B04",
          "B08",
          "SCL",
          "dataMask"
        ]
      }
    ],
    output: {
      bands: 4,
      sampleType: "UINT8"
    }
  };
}

function evaluatePixel(sample) {

  if (sample.dataMask === 0) {
    return [0, 0, 0, 0];

    return [255, 0, 255, 255];
  }

  // Natural colour satellite imagery
  const red = sample.B04;
  const green = sample.B03;
  const blue = sample.B02;

  function enhance(value) {
    return Math.min(
      255,
      Math.max(0, value * 255 * 2.5)
    );
  }

  const baseRed = enhance(red);
  const baseGreen = enhance(green);
  const baseBlue = enhance(blue);

  // Keep cloud and shadow pixels as satellite imagery.
  const invalidClasses = [0, 1, 3, 8, 9, 10, 11];

  if (invalidClasses.includes(sample.SCL)) {
    return [
      baseRed,
      baseGreen,
      baseBlue,
      255
    ];
  }

  // Calculate NDVI
  const denominator = sample.B08 + sample.B04;

  const ndvi =
    denominator === 0
      ? 0
      : (sample.B08 - sample.B04) / denominator;

  // NDVI classification colours
  let overlayRed;
  let overlayGreen;
  let overlayBlue;

  if (ndvi < 0.2) {
    // Low vegetation
    overlayRed = 220;
    overlayGreen = 55;
    overlayBlue = 55;

  } else if (ndvi < 0.45) {
    // Moderate vegetation
    overlayRed = 255;
    overlayGreen = 205;
    overlayBlue = 45;

  } else {
    // Healthy vegetation
    overlayRed = 40;
    overlayGreen = 180;
    overlayBlue = 85;
  }

  // Blend satellite imagery with NDVI classification
  const opacity = 0.45;

  const finalRed =
    baseRed * (1 - opacity) +
    overlayRed * opacity;

  const finalGreen =
    baseGreen * (1 - opacity) +
    overlayGreen * opacity;

  const finalBlue =
    baseBlue * (1 - opacity) +
    overlayBlue * opacity;

  return [
    finalRed,
    finalGreen,
    finalBlue,
    255
  ];
}
`;

export async function getNDVIImage(boundary) {
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

  const formatDate = (date) => date.toISOString();

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
              from: formatDate(startDate),
              to: formatDate(endDate)
            },
            maxCloudCoverage: 40,
            mosaickingOrder: "leastCC"
          }
        }
      ]
    },
    output: {
      width: 512,
      height: 512,
      responses: [
        {
          identifier: "default",
          format: {
            type: "image/png"
          }
        }
      ]
    },
    evalscript: NDVI_EVALSCRIPT
  };

  const response = await fetch(PROCESS_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "image/png"
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorDetails = await response.text();

    console.error(
      "Sentinel Hub Process API error:",
      response.status,
      errorDetails
    );

    throw new Error(
      `Satellite processing failed with status ${response.status}.`
    );
  }

  return Buffer.from(await response.arrayBuffer());
}
