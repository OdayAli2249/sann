import LoadingButton from "@mui/lab/LoadingButton";
import {ButtonProps} from "@mui/material/Button";

const AppButton = ({
  width = 164,
  height = 40,
  type = "button",
  variant = "contained",
  sx,
  bgcolor,
  onClick,
  children,
  isLoading,
  disabled = false,
  ...props
}: ButtonProps & {
  bgcolor?: string;
  width?: number | string | any;
  height?: number | string;
  isLoading?: boolean;
  disabled?: boolean;
}) => {
  return (
    <LoadingButton
      variant={variant}
      onClick={onClick}
      type={type}
      loading={isLoading}
      disabled={disabled}
      sx={{
        bgcolor,
        fontWeight: 500,
        p: "6px 14px",
        borderRadius: "8px",
        width,
        height: {
          xs: typeof height === "number" ? height - 6 : height,
          lg: height,
        },
        ":hover": {
          bgcolor,
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </LoadingButton>
  );
};

export default AppButton;
