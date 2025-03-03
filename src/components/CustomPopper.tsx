import zIndexes from "@/constants/zIndexes";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import {PopperPlacementType} from "@mui/material/Popper";
import {SxProps, Theme} from "@mui/material/styles";
import React, { JSXElementConstructor, ReactElement } from "react";

type PropTypes = {
  open: boolean;
  anchorRef: React.RefObject<HTMLButtonElement>;
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  popperWidth?: number;
  popperPlacement?: PopperPlacementType;
  popperTransformOrigin?: "top" | "bottom" | "left" | "right";
  handleClose: (event?: Event | React.SyntheticEvent) => void;
  containerStyle?: SxProps;
  paperElevation?: number;
  sx?: SxProps<Theme>;
};

const CustomPopper = ({
  open,
  anchorRef,
  children,
  handleClose,
  popperWidth,
  containerStyle = {},
  paperElevation: elevation = 0,
  popperPlacement = "bottom",
  popperTransformOrigin = "top",
  sx,
}: PropTypes) => {
  return (
    <Popper
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      placement={popperPlacement}
      transition
      disablePortal
      sx={{
        zIndex: zIndexes.popper,
        width: popperWidth ? popperWidth : anchorRef.current?.clientWidth,
        minWidth: anchorRef.current?.clientWidth,
        ...sx,
      }}
    >
      {({ TransitionProps }) => (
        <Grow
          {...TransitionProps}
          timeout={300}
          style={{
            transformOrigin: popperTransformOrigin,
          }}
        >
          <Paper elevation={elevation} sx={{ ...containerStyle }}>
            <ClickAwayListener onClickAway={handleClose}>
              {children}
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

export default CustomPopper;
