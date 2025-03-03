import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { urlToPageNameMapper } from "@/constants/urlToPageNameMapper";
import { Box } from "@mui/material";
import { getStandardUrlFrom } from "@/utils/helpers";

type PropTypes = {
  sidebarExpanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = (props: PropTypes) => {
  const location = useLocation();

  return (
    <AppBar
      component="nav"
      sx={{
        top: 0,
        backgroundColor: "white",
        height: { xs: "4rem", sm: "4.375rem" }, // 60px and 70px converted to rem
        width: {
          xs: "100%",
          sm: !props.sidebarExpanded
            ? "calc(100vw - 90px)"
            : "calc(100vw - 270px)", // 180px converted to rem
        },
        ml: "auto",
        mr: 0,
        p: "0.5rem", // 8px converted to rem
        transition: "300ms ease-out width",
        backgroundImage: "none",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        boxShadow: (theme) =>
          theme.palette.mode === "dark"
            ? "3px 0px 25px rgba(32, 35, 45, 0.12);"
            : "3px 0px 23px rgba(206, 213, 216, 0.15)",
        justifyContent: "space-between", // Ensure content stays within bounds
      }}
      position="sticky"
    >
      <Toolbar
        sx={{
          pl: { sm: "0.5rem" },
          mr: { sm: "0.75rem" },
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="h5">
            {urlToPageNameMapper[getStandardUrlFrom(location.pathname)]}
          </Typography>
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          gap="0.5rem"
          sx={{ flexShrink: 0 }}
        >
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
