//src/components/map/MapPicker.tsx
import { Box } from "@mui/material";
import { useEffect, useMemo, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat, toLonLat } from "ol/proj";
import { Style } from "ol/style";
import CircleStyle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import type { LonLat } from "../../types/todo";

type Props = {
  value: LonLat | null;
  onChange: (next: LonLat) => void;
  height?: number;
};

const pickerStyle = new Style({
  image: new CircleStyle({
    radius: 7,
    fill: new Fill({ color: "#9c27b0" }),
    stroke: new Stroke({ color: "#ffffff", width: 2 }),
  }),
});

export default function MapPicker({ value, onChange, height = 220 }: Props) {
  const mapElRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const sourceRef = useRef<VectorSource | null>(null);

  const feature = useMemo(() => {
    if (!value) return null;
    return new Feature({
      geometry: new Point(fromLonLat(value)),
    });
  }, [value]);

  useEffect(() => {
    if (!mapElRef.current) return;
    if (mapRef.current) return;

    const source = new VectorSource();
    sourceRef.current = source;

    const map = new Map({
      target: mapElRef.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        new VectorLayer({ source, style: pickerStyle }),
      ],
      view: new View({
        center: fromLonLat(value ?? [34.8, 31.9]),
        zoom: value ? 12 : 7,
      }),
    });

    map.on("click", (evt) => {
      const lonLat = toLonLat(evt.coordinate) as LonLat;
      onChange([Number(lonLat[0]), Number(lonLat[1])]);
    });

    mapRef.current = map;

    return () => {
      map.setTarget(undefined);
      mapRef.current = null;
      sourceRef.current = null;
    };
  }, [onChange, value]);

  useEffect(() => {
    const source = sourceRef.current;
    if (!source) return;

    source.clear(true);
    if (feature) source.addFeature(feature);
  }, [feature]);

  useEffect(() => {
    if (!value) return;
    const map = mapRef.current;
    if (!map) return;
    map.getView().setCenter(fromLonLat(value));
  }, [value]);

  return (
    <Box sx={{ width: "100%", height, borderRadius: 1, overflow: "hidden" }}>
      <div ref={mapElRef} style={{ width: "100%", height: "100%" }} />
    </Box>
  );
}
