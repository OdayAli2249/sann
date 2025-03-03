import ColoredSvg from "@/components/ColoredSvg";
import { icons } from "@/constants/icons";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { SxProps, useTheme, Theme } from "@mui/material/styles";
import { ChangeEvent } from "react";
import ErrorText from "./ErrorText";
import { Stack } from "@mui/material";

interface CustomTextFieldProps extends Omit<OutlinedInputProps, "onChange" | "error" | "sx"> {
  title: string;
  titleRequired?: boolean;
  label?: string;
  name: string;
  value?: string | number;
  startAdornmentIcon?: string;
  sx?: SxProps<Theme>;
  showLabel?: boolean;
  multiline?: boolean;
  rows?: number;
  type?: string;
  formControlStyle?: SxProps<Theme>;
  error?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id?: string) => void;
  onClear?: () => void;
  min?: number;
  max?: number;
  pattern?: string;
  unit?: string;
  disabled?: boolean;
}

const CustomTextField = ({
  title,
  titleRequired = false,
  label,
  name,
  value,
  startAdornmentIcon,
  multiline = false,
  rows,
  min,
  max,
  showLabel = true,
  sx: customProps,
  onChange,
  onClear,
  formControlStyle,
  error,
  pattern,
  unit,
  disabled = false,
  ...props
}: CustomTextFieldProps) => {
  const theme = useTheme();

  return (
    <Stack flexDirection={"column"} justifyContent={"space-between"} gap={0.5}>
      <Typography variant="body2" sx={{ fontSize: 13, display: "flex", alignItems: "center" }}>
        {title}
        {titleRequired && <Typography component="span" sx={{ fontSize: 13, color: "error.main", marginLeft: 0.5 }}>
          *
        </Typography>}
      </Typography>
      <FormControl size="small"
        sx={{
          transition: "all ease-out 200ms",
          width: "100%",
          "& .MuiFormLabel-root.MuiInputLabel-root": {
            transition: "all ease-out 200ms",
            color: error ? "status.red" : "text.tertiary",
          },
          "& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused": {
            color: error ? "status.red" : "primary.main",
          },
          "& .MuiOutlinedInput-input:-webkit-autofill": {
            boxShadow: (theme) => `0px 48px ${theme.palette.background.paper} inset !important`,
            borderRadius: "0 !important",
          },
          ...formControlStyle,
        }}
        variant="outlined"
      >
        {showLabel && <InputLabel htmlFor={name}>{label}</InputLabel>}
        <OutlinedInput
          id={name}
          type={"text"}
          name={name}
          value={props.type === "number" ? Number(value).toString() : value}
          onChange={(event) => onChange && onChange(event, name)}
          disabled={disabled}
          inputProps={{
            min,
            max,
            step: "any",
            pattern,
          }}
          sx={{
            borderRadius: "4px",
            "& label.Mui-focused": { color: "white" },
            "& .MuiOutlinedInput-root": {
              m: 0,
              "& .Mui-focused fieldset": {
                borderColor: (theme) => `${theme.palette.grey[30]} !important`,
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              transition: "all ease-out 200ms",
              borderColor: error ? "status.red" : `${theme.palette.grey[30]} !important`,
            },
            ...customProps,
          }}
          startAdornment={
            startAdornmentIcon && (
              <InputAdornment position="start">
                <ColoredSvg
                  src={startAdornmentIcon}
                  color={theme.palette.text.primary}
                  width={24}
                  height={24}
                />
              </InputAdornment>
            )
          }
          endAdornment={
            multiline ? (
              <Typography
                component="span"
                alignSelf={"flex-end"}
                variant="body2"
                color={(value as string)?.length < 255 ? "text.tertiary" : "status.red"}
              >
                {(value as string)?.length ?? 0}/255
              </Typography>
            ) : onClear ? (
              <InputAdornment position="end" sx={{ display: value ? "" : "none" }}>
                <IconButton onClick={() => onClear()} edge="end" sx={{ p: 0, m: 0 }}>
                  <ColoredSvg
                    src={icons.deleteCircle}
                    color={theme.palette.text.primary}
                    width={24}
                    height={24}
                  />
                </IconButton>
              </InputAdornment>
            ) : unit ? (
              <Box sx={{ borderLeft: `1px solid ${theme.palette.grey[20]}`, pl: "8px" }}>{unit}</Box>
            ) : undefined
          }
          onClick={(e) => e.stopPropagation()}
          label={showLabel ? label : ""}
          placeholder={!showLabel ? label : ""}
          multiline={multiline}
          rows={rows}
          error={!!error}
          {...props}
        />
        <ErrorText error={error} />
      </FormControl>
    </Stack>
  );
};

export default CustomTextField;
