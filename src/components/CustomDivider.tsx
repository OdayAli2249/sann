import Divider from "@mui/material/Divider";
import { SxProps } from "@mui/material/styles";

interface CustomDividerProps {
  color?: string;
  orientation?: "horizontal" | "vertical";
  sx?: SxProps;
}

const CustomDivider = ({
  color = "background.paperDivider",
  orientation = "horizontal",
  sx,
}: CustomDividerProps) => {
  return <Divider orientation={orientation} sx={{ borderColor: color, ...sx }} />;
};

export default CustomDivider;
