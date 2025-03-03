import Paper from "@mui/material/Paper";
import {SxProps, Theme} from "@mui/material/styles";
import React, { ReactNode } from "react";

type PropTypes = {
  children?: ReactNode;
  padding?: number;
  sx?: SxProps<Theme>;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

const CustomPaper: React.FC<PropTypes> = ({
  className,
  children,
  padding,
  sx,
  onClick,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "16px",
        p: padding ? padding : 0,
        border: (theme) => `1px solid ${theme.palette.grey[200]}`,
        ...sx,
      }}
      className={className}
      onClick={onClick}
    >
      {children}
    </Paper>
  );
};

export default CustomPaper;
