//src/components/map/TodoMap.tsx
import { Box } from "@mui/material";
import { useEffect, useMemo, useRef } from "react";
import OlMap from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Style } from "ol/style";
import Icon from "ol/style/Icon";
import Overlay from "ol/Overlay";
import type { Todo } from "../../types/todo";
import { placePinDataUri } from "./markerIcon";
import { unByKey } from "ol/Observable";
import type { EventsKey } from "ol/events";


type Props = {
  todos?: Todo[];
  height?: number;
};

const STYLE_CACHE = new Map<string, Style>();

function getMarkerStyle(completed: boolean) {
  const fill = completed ? "#2e7d32" : "#d32f2f"; // green / red
  const cached = STYLE_CACHE.get(fill);
  if (cached) return cached;

  const style = new Style({
    image: new Icon({
      src: placePinDataUri(fill),
      anchor: [0.5, 1],
      anchorXUnits: "fraction",
      anchorYUnits: "fraction",
      scale: 0.75,
    }),
  });

  STYLE_CACHE.set(fill, style);
  return style;
}

export default function TodoMap({ todos = [], height = 320 }: Props) {
  const mapElRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<OlMap | null>(null);
  const vectorSourceRef = useRef<VectorSource | null>(null);

  const tooltipElRef = useRef<HTMLDivElement | null>(null);
  const tooltipOverlayRef = useRef<Overlay | null>(null);

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

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: (feature) => {
        const completed = Boolean(feature.get("completed"));
        return getMarkerStyle(completed);
      },
    });

    const map = new OlMap({
      target: mapElRef.current,
      layers: [new TileLayer({ source: new OSM() }), vectorLayer],
      view: new View({
        center: fromLonLat([34.8, 31.9]),
        zoom: 7,
      }),
    });

    let pointerMoveKey: EventsKey | undefined;
    let mouseOutHandler: (() => void) | undefined;


    if (tooltipElRef.current) {
      const overlay = new Overlay({
        element: tooltipElRef.current,
        offset: [0, -10],
        positioning: "bottom-center",
        stopEvent: false,
      });
      tooltipOverlayRef.current = overlay;
      map.addOverlay(overlay);

      const hideTooltip = () => {
        const el = tooltipElRef.current!;
        el.classList.remove("is-visible");
        overlay.setPosition(undefined);
        map.getTargetElement().style.cursor = "";
      };

      pointerMoveKey = map.on("pointermove", (evt) => {
        if (evt.dragging) {
          hideTooltip();
          return;
        }

        const el = tooltipElRef.current!;
        const feature = map.forEachFeatureAtPixel(
          evt.pixel,
          (f) => f,
          { hitTolerance: 6 }
        ) as Feature | undefined;

        if (!feature) {
          hideTooltip();
          return;
        }

        const name = String(feature.get("name") ?? "");
        el.textContent = name;

        const geom = feature.getGeometry();
        if (geom instanceof Point) {
          overlay.setPosition(geom.getCoordinates());
        } else {
          overlay.setPosition(evt.coordinate);
        }

        el.classList.add("is-visible");
        map.getTargetElement().style.cursor = "pointer";
      });

      mouseOutHandler = () => hideTooltip();
      map.getTargetElement().addEventListener("mouseout", mouseOutHandler);
    }

    mapRef.current = map;

    return () => {
      if (pointerMoveKey) unByKey(pointerMoveKey);
      if (mouseOutHandler) {
        map.getTargetElement().removeEventListener("mouseout", mouseOutHandler);
      }

      map.setTarget(undefined);
      mapRef.current = null;
      vectorSourceRef.current = null;
      tooltipOverlayRef.current = null;
    };
  }, []);

  useEffect(() => {
    const source = vectorSourceRef.current;
    if (!source) return;
    source.clear(true);
    source.addFeatures(features);
  }, [features]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height,
        borderRadius: 1,
        overflow: "hidden",
      }}
    >
      <div ref={mapElRef} style={{ width: "100%", height: "100%" }} />
      <div ref={tooltipElRef} className="ol-tooltip" />
    </Box>
  );
}
