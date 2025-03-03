import Button from "@mui/material/Button";
import {ButtonProps} from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

const CustomIconButton = ({
  width = 48,
  height = 48,
  bgc = "background.paper",
  onClick,
  children,
  disableRipple = false,
  sx,
  tooltip,
}: ButtonProps & {
  width?: number;
  height?: number;
  bgc?: string;
  tooltip?: string;
}) => {
  return (
    <Tooltip title={tooltip || ""} arrow placement="top">
      <span>
        <Button
          onClick={onClick}
          variant="contained"
          disableRipple={disableRipple}
          sx={{
            width: width,
            height: height,
            flexShrink: 0,
            p: 0,
            display: "flex",
            minWidth: "auto",
            bgcolor: bgc,
            borderRadius: "8px",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "none",
            ":hover": {
              boxShadow: "none",
              bgcolor: bgc,
            },
            ...sx,
          }}
        >
          {children}
        </Button>
      </span>
    </Tooltip>
  );
};

export default CustomIconButton;
