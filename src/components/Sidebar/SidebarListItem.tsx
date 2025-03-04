import { useEffect, useState } from "react";
import { SidebarItem } from "@/types/customTypes";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLocation, useNavigate } from "react-router-dom";
import { calculateSpacing } from "@/utils/helpers";
import ColoredSvg from "../ColoredSvg";
import { icons } from "@/constants/icons";

type PropTypes = {
  item: SidebarItem;
  sidebarExpanded?: boolean;
  selected?: boolean;
  customColor?: string;
  setSidebarExpanded?: (expanded: boolean) => void;
};

const SidebarListItem = ({
  item: MainItem,
  sidebarExpanded = false,
  setSidebarExpanded,
  selected,
  customColor,
}: PropTypes) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (expanded) {
      setExpanded((prev) => !prev);
    }
    if (
      MainItem.items?.some(
        (i) =>
          location.pathname.includes(i.title) ||
          location.pathname.includes(i.url)
      ) ||
      location.pathname.includes(MainItem.url!)
    ) {
      setExpanded(true);
    }
  }, [sidebarExpanded]);

  return (
    <Stack direction="row" justifyContent={"space-between"} paddingX={"1rem"}>
      <Button
        onClick={() => {
          if (MainItem.onClick) MainItem.onClick?.();
          else navigate(MainItem.url!);
          if (smallScreen) setSidebarExpanded?.(false);
        }}
        startIcon={
          <ColoredSvg
            color={
              customColor ??
              (selected
                ? theme.palette.primary.main
                : theme.palette.action.active)
            }
            width={40}
            height={40}
            src={MainItem.icon!}
          />
        }
        sx={{
          color:
            selected ||
              (expanded &&
                MainItem.items?.some((i) => location.pathname.includes(i.url)))
              ? "primary"
              : "text.secondary",
          pointerEvents: "auto",
          cursor: "pointer",
          py: smallScreen ? calculateSpacing(20) : calculateSpacing(24),
          pl: 0,
          height: 56,
          minWidth: 56,
          width: "calc(100% + 16px)",
          position: "relative",
          justifyContent: "flex-start",
          backgroundColor: "white",
          "&>.MuiButton-endIcon": {
            ml: "auto",
          },
          "&>.MuiButton-startIcon": {
            pl: 1,
          },
          ":hover": {
            bgcolor: !customColor ? "primary.states.hover" : "transparent",
            color: "text.primary",
            borderRadius: "0.5rem",
            transition: "all 1ms",
          },
          "&:hover .MuiTypography-root": {
            color: customColor ?? "text.primary",
          },
          bgcolor: selected ? "primary.states.selected" : "transparent",
          textTransform: "none",
          "&  .MuiButton-startIcon": { m: 0 },
          "& svg path": selected
            ? {
              fill: theme.palette.primary.main,
              fillOpacity: 1,
              strokeOpacity: 1,
            }
            : { fillOpacity: 1, strokeOpacity: 1 },
        }}
      >
        {sidebarExpanded && (
          <Typography
            variant="subtitle1"
            color={
              customColor ?? (selected ? "primary.main" : "text.secondary")
            }
            noWrap
            marginInlineStart={".5rem"}
          >
            {MainItem.title}
          </Typography>
        )}
      </Button>
      {!sidebarExpanded || !MainItem.items ? null : !expanded ? (
        <IconButton
          onClick={() => setExpanded((prev) => !prev)}
          sx={{
            color: selected
              ? "primary.states.selected"
              : theme.palette.grey[500],
          }}
        >
          <ColoredSvg
            src={icons.refill}
            color={
              selected ? "primary.states.selected" : theme.palette.grey[500]
            }
          />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => setExpanded((prev) => !prev)}
          sx={{
            color: selected
              ? "primary.states.selected"
              : theme.palette.grey[500],
          }}
        >
          <ColoredSvg
            src={icons.refill}
            color={
              selected ? "primary.states.selected" : theme.palette.grey[500]
            }
          />
        </IconButton>
      )}
    </Stack>
  );
};

export default SidebarListItem;
