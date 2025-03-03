import zIndexes from "@/constants/zIndexes";
import { calculateSpacing } from "@/utils/helpers";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {SxProps, useTheme, Theme} from "@mui/material/styles";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ReactNode } from "react";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import CustomDivider from "./CustomDivider";

interface AppDrawerProps {
  children: ReactNode;
  isOpen: boolean;
  title: string;
  close: () => void;
  sx?: SxProps<Theme>;
  titleSx?: SxProps<Theme>;
}
const AppDrawer = ({
  title,
  isOpen,
  children,
  close,
  sx,
  titleSx,
}: AppDrawerProps) => {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <SwipeableDrawer
      onOpen={() => {}}
      anchor={smallScreen ? "bottom" : "right"}
      open={isOpen}
      onClose={close}
      sx={{ zIndex: zIndexes.filterDrawer }}
      PaperProps={{
        elevation: 0,
        sx: {
          width: smallScreen ? "100%" : 340,
          height: smallScreen ? "80%" : "calc(100% - 24px)",
          mt: calculateSpacing(12),
          mr: smallScreen ? 0 : calculateSpacing(12),
          borderRadius: smallScreen ? "12px 12px 0 0" : "12px",
          pt: 2,
          px: { xs: 2, sm: 0 },
          ...sx,
        },
      }}
      transitionDuration={300}
    >
      <Typography
        display="flex"
        alignItems="center"
        justifyContent={{ xs: "", sm: "center" }}
        position={"relative"}
        px={{ xs: 0, sm: 2 }}
        variant="h6"
        sx={{ ...titleSx }}
      >
        {smallScreen && (
          <CustomDivider
            sx={{
              position: "absolute",
              top: -10,
              right: 0,
              left: 0,
              width: 40,
              borderWidth: 2.5,
              borderRadius: 2,
              opacity: 0.3,
              mx: "auto",
            }}
            color={"primary.main"}
            orientation="horizontal"
          />
        )}
        <span>{title}</span>
        <IconButton onClick={close} sx={{ ml: "auto" }}>
          <HighlightOffOutlinedIcon sx={{ color: "action.active" }} />
        </IconButton>
      </Typography>

      {children}
    </SwipeableDrawer>
  );
};

export default AppDrawer;
