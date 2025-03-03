import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Tooltip } from "@mui/material";

const CustomSwitch = ({
  title,
  checked,
  onChange,
  disabled,
  sx,
}: {
  title?: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  sx?: any;
}) => {

  return (
    <Tooltip title={title} arrow placement="top">
      <FormControlLabel
        sx={{
          marginLeft: 0,
          ...sx,
        }}
        control={
          <Switch
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            sx={{
              "&.MuiSwitch-root": {
                width: "38px;",
                height: "28px",
                padding: "7px",
              },
              "& .MuiButtonBase-root": {
                color: "primary.contrast",
              },
              "& .MuiSwitch-thumb": {
                width: "10px",
                height: "10px",
              },
              "& .MuiSwitch-switchBase.Mui-checked": {
                transform: "translateX(10px)",
                color: "primary.10",
              },
              "& .MuiSwitch-track": {
                opacity: 1,
                backgroundColor: "grey.300",
              },
              "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {
                opacity: 1,
              },
              "& .MuiSwitch-switchBase:hover,.MuiSwitch-switchBase.Mui-checked:hover": { background: "transparent" }
            }}
          />
        }
        label=""
      />
    </Tooltip>
  );
};

export default CustomSwitch;
