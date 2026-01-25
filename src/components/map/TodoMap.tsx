//src/components/map/TodoMap.tsx
import { Box } from "@mui/material";
import { useEffect, useMemo, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Style } from "ol/style";
import CircleStyle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import type { Todo } from "../../types/todo";

type Props = {
  todos?: Todo[];
  height?: number;
};

const markerStyle = new Style({
  image: new CircleStyle({
    radius: 7,
    fill: new Fill({ color: "#1976d2" }),
    stroke: new Stroke({ color: "#ffffff", width: 2 }),
  }),
});

export default function TodoMap({ todos = [], height = 320 }: Props) {
  const mapElRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const vectorSourceRef = useRef<VectorSource | null>(null);

  const features = useMemo(() => {
    return todos.map((t) => {
      const f = new Feature({
        geometry: new Point(fromLonLat(t.location)),
        name: t.name,
        completed: t.completed,
        todoId: t.id,
      });
      f.setId(t.id);
      return f;
    });
  }, [todos]);

  useEffect(() => {
    if (!mapElRef.current) return;
    if (mapRef.current) return;

    const vectorSource = new VectorSource();
    vectorSourceRef.current = vectorSource;

    const map = new Map({
      target: mapElRef.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        new VectorLayer({
          source: vectorSource,
          style: markerStyle,
        }),
      ],
      view: new View({
        center: fromLonLat([34.8, 31.9]),
        zoom: 7,
      }),
    });

    mapRef.current = map;

    return () => {
      map.setTarget(undefined);
      mapRef.current = null;
      vectorSourceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const source = vectorSourceRef.current;
    if (!source) return;
    source.clear(true);
    source.addFeatures(features);
  }, [features]);

  return (
    <Box sx={{ width: "100%", height, borderRadius: 1, overflow: "hidden" }}>
      <div ref={mapElRef} style={{ width: "100%", height: "100%" }} />
    </Box>
  );
}
