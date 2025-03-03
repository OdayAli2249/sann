import React from "react";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import {useTheme} from "@mui/material/styles";
import { icons } from "@/constants/icons";
import ColoredSvg from "./ColoredSvg";
import { useUiContext } from "@/context/ui";

export interface ContextMenuItem {
  title: string | React.ReactNode;
  onClick?: () => void;
  color?: string;
  hoverColor?: string;
  textHoverColor?: string;
  hasPermission?: boolean;
  icon?: {
    src: string;
    width?: number;
    height?: number;
    color?: string;
  };
}

const ContextMenu = ({
  items,
  bg,
  width = "32px",
  height = "32px",
}: {
  items?: ContextMenuItem[];
  bg?: boolean;
  width?: string | number;
  height?: string | number;
}) => {
  const theme = useTheme();
  const { state } = useUiContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const primaryColor = state.isDark ? "white" : theme.palette.primary.main;

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <IconButton
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          backgroundColor: bg ? "divider" : "transparent",
          ":hover": {
            backgroundColor: bg ? "grey.30" : "transparent",
          },
          width: width,
          height: height,
          borderRadius: "8px",
        }}
      >
        <ColoredSvg src={icons.ellipse} color={theme.palette.text.primary} width={18} height={18} />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        elevation={0}
        sx={{
          "& .MuiPaper-root": { boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.08)!important" },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {items?.map((item, index) => {
          const hasPermission = item.hasPermission ?? true;
          return (
            <MenuItem
              key={index}
              sx={{
                minWidth: 115,
                color: hasPermission ? (item.color ? item.color : "text.tertiary") : "grey.main",
                cursor: hasPermission ? "pointer" : "not-allowed",
                textTransform: "capitalize",
                fontWeight: 500,
                fontSize: "14px",
                m: 1,
                borderRadius: 1,
                minHeight: "10px",
                transition: "background-color 300ms ease-out",
                ":hover": {
                  color: hasPermission
                    ? item.textHoverColor
                      ? item.textHoverColor
                      : item.color || primaryColor
                    : "grey.main",
                  bgcolor: hasPermission
                    ? item.hoverColor
                      ? item.hoverColor
                      : "background.paperHover"
                    : "initial",
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (hasPermission) {
                  handleClose();
                  item.onClick && item?.onClick();
                }
              }}
            >
              {item.icon && (
                <ListItemIcon>
                  <ColoredSvg
                    color={item.color ?? theme.palette.text.primary}
                    src={item.icon.src}
                    width={item.icon.width ?? 20}
                    height={item.icon.height ?? 20}
                  />
                </ListItemIcon>
              )}
              {item.title}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default ContextMenu;
