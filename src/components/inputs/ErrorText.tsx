import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";
import { CSSProperties } from "react";

const ErrorText = ({ error, style }: { error?: string; style?: CSSProperties }) => {
  return (
    <FormHelperText variant="outlined" sx={{ ...style }}>
      <Typography
        component={"span"}
        variant="body2"
        textTransform={"capitalize"}
        sx={{
          opacity: error ? 1 : 0,
          color: "#d32f2f",
          fontSize: 11,
          transition: "all ease-out 200ms",
        }}
      >
        {error}
      </Typography>
    </FormHelperText>
  );
};

export default ErrorText;
