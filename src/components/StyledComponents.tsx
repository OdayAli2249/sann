import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import {styled} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import {IconButtonProps} from "@mui/material/IconButton";

export const StyledTooltip = styled(({ className, color, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme, color }) => ({
  [`& .${tooltipClasses.tooltipArrow}`]: {
    backgroundColor: color,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
  },
  [`& .${tooltipClasses.arrow}`]: {
    "&:before": {
      border: `1px solid ${color}`,
    },
    color,
  },
}));

export const ExpandMore = styled(
  (props: { expand: boolean; toggler?: boolean } & IconButtonProps) => {
    const { expand, toggler = false, ...other } = props;
    return (
      <IconButton
        {...other}
        sx={{
          p: 0,
          m: 0,
          width: "max-content",
          height: "max-content",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          rotate: toggler ? "180deg" : "0deg",
        }}
      />
    );
  }
)(({ theme, expand, toggler }) => ({
  transform: !expand && !toggler ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
