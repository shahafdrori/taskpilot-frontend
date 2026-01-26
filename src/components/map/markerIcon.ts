//src/components/map/markerIcon.ts
type SvgPathDataUriOptions = {
  pathD: string;
  fill: string;
  size?: number;
  viewBox?: string;
  fillRule?: "evenodd" | "nonzero";
};

export function svgPathDataUri({
  pathD,
  fill,
  size = 64,
  viewBox = "0 0 24 24",
  fillRule = "evenodd",
}: SvgPathDataUriOptions) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${viewBox}">
      <path fill="${fill}" fill-rule="${fillRule}" d="${pathD}" />
    </svg>
  `.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Material UI Place icon SVG path (Filled)
export const PLACE_ICON_PATH_D =
  "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z";

export function placePinDataUri(fill: string) {
  return svgPathDataUri({ pathD: PLACE_ICON_PATH_D, fill });
}
