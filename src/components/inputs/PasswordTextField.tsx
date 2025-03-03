import { icons } from "@/constants/icons";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { SxProps, Theme, useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import CustomTextField from "./CustomTextField";
import ColoredSvg from "../ColoredSvg";

export const PasswordTextField = ({
  id,
  name,
  label,
  value,
  placeholder,
  error,
  sx,
  setVisible,
  visible,
  onChangeHandler,
}: {
  id: string;
  name: string;
  label?: string;
  value: string;
  placeholder: string;
  error?: string;
  sx?: SxProps<Theme>;
  onChangeHandler: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id?: string
  ) => void;
  visible?: boolean;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const theme = useTheme();
  const [localVisible, setLocalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (visible && visible !== localVisible) {
      setLocalVisible(visible);
    }
  }, [visible]);

  return (
    <CustomTextField
      title={label ?? "Password"}
      placeholder={placeholder}
      value={value ?? ""}
      onChange={onChangeHandler}
      id={id}
      name={name}
      label={label}
      type={localVisible ? "text" : "password"}
      autoComplete={"new-password"}
      sx={{ ...sx }}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            onClick={() => {
              if (setVisible) setVisible((prev) => !prev);
              setLocalVisible((prev) => !prev);
            }}
            edge="end"
            sx={{ p: 0, m: 0 }}
          >
            <ColoredSvg
              src={localVisible ? icons.eyeHide : icons.eyeVisible}
              color={theme.palette.text.primary}
              width={18}
              height={18}
            />
          </IconButton>
        </InputAdornment>
      }
      error={error}
      showLabel={false}
    />
  );
};
