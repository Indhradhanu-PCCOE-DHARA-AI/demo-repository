
import { useRef } from "react";
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import * as turf from "@turf/turf";

function FarmMap({
  center = [20.5937, 78.9629],
  onBoundaryChange,
}) {
  const featureGroupRef = useRef(null);

  const calculateBoundary = (layer) => {
    const geoJSON = layer.toGeoJSON();

    if (geoJSON.geometry.type !== "Polygon") {
      return;
    }

    const areaInSquareMeters = turf.area(geoJSON);
    const areaInHectares = areaInSquareMeters / 10000;

    onBoundaryChange?.({
      boundary: geoJSON.geometry,
      boundaryArea: Number(areaInHectares.toFixed(4)),
    });
  };

  // When a new polygon is drawn, replace the previous one.
  const handleCreated = (event) => {
    const layer = event.layer;

    if (event.layerType !== "polygon") {
      return;
    }

    const featureGroup = featureGroupRef.current;

    if (featureGroup) {
      featureGroup.clearLayers();
      featureGroup.addLayer(layer);
    }

    calculateBoundary(layer);
  };

  // Update the saved polygon after editing.
  const handleEdited = (event) => {
    event.layers.eachLayer((layer) => {
      calculateBoundary(layer);
    });
  };

  // Clear boundary data after deletion.
  const handleDeleted = () => {
    onBoundaryChange?.({
      boundary: null,
      boundaryArea: null,
    });
  };

  return (
    <div className="farm-map-container">
      <MapContainer
        center={center}
        zoom={center[0] === 20.5937 ? 5 : 16}
        scrollWheelZoom={true}
        style={{
          height: "450px",
          width: "100%",
          borderRadius: "16px",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FeatureGroup ref={featureGroupRef}>
          <EditControl
            position="topright"
            onCreated={handleCreated}
            onEdited={handleEdited}
            onDeleted={handleDeleted}
            draw={{
              polygon: {
                allowIntersection: false,
                showArea: true,
              },
              rectangle: false,
              circle: false,
              circlemarker: false,
              marker: false,
              polyline: false,
            }}
            edit={{
            edit: {},
              remove: true,
            }}
          />
        </FeatureGroup>
      </MapContainer>
    </div>
  );
}

export default FarmMap;
