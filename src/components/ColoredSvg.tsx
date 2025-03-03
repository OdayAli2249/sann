import { useTheme } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import { CSSProperties, useState } from "react";

const ColoredSvg = ({
  src,
  color,
  onHoverColor,
  width = 24,
  height = 24,
  style,
  defaultColor,
}: {
  src: string;
  color?: string;
  onHoverColor?: string;
  width?: number;
  height?: number;
  style?: CSSProperties;
  defaultColor?: boolean;
}) => {
  const [isHover, setIsHover] = useState(false);
  const theme = useTheme();

  color = color || theme.palette.text.primary;

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const fetchSvg = async () => {
    const response = await fetch(src, {
      cache: "force-cache",
      headers: new Headers({ "Content-Type": "image/svg+xml" }),
    });
    const svgText = await response.text();
    return svgText.includes("svg") ? svgText : "";
  };

  const { data: svg } = useQuery({
    queryKey: [src],
    queryFn: fetchSvg,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
  });

  
  const currentColor = isHover && onHoverColor ? onHoverColor : color;

  // let coloredSvg = svg;
  let coloredSvg =
    svg &&
    svg.replace(/width="\d+"/, `width="${width}"`).replace(/height="\d+"/, `height="${height}"`);

  coloredSvg = defaultColor
    ? svg
    : svg &&
      svg
        .replace(/fill="((?!none)[^"]*)"/g, `fill="${currentColor}"`)
        .replace(/stroke="((?!none)[^"]*)"/g, `stroke="${currentColor}"`);

  return (
    <span
      dangerouslySetInnerHTML={{ __html: coloredSvg! }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        width,
        height,
        ...style,
      }}
    />
  );
};

export default ColoredSvg;
