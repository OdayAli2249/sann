import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

const PageLoading = ({
  height = "100vh",
  size = 40,
}: {
  height?: number | string;
  size?: number | string;
}) => {
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      minHeight={height}
      height={"100%"}
      width={"100%"}
    >
      <CircularProgress size={size} />
    </Stack>
  );
};

export default PageLoading;
