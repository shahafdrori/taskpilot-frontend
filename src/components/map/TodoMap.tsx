//src/components/map/TodoMap.tsx
import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";

type Props = {
  height?: number;
};

export default function TodoMap({ height = 320 }: Props) {
  const mapElRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapElRef.current) return;
    if (mapRef.current) return;

    const map = new Map({
      target: mapElRef.current,
      layers: [new TileLayer({ source: new OSM() })],
      view: new View({
        center: fromLonLat([34.8, 31.9]),
        zoom: 7,
      }),
    });

    mapRef.current = map;

    return () => {
      map.setTarget(undefined);
      mapRef.current = null;
    };
  }, []);

  return (
    <Box sx={{ width: "100%", height, borderRadius: 1, overflow: "hidden" }}>
      <div ref={mapElRef} style={{ width: "100%", height: "100%" }} />
    </Box>
  );
}
