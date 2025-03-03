import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import BasicLogo from "../Logo/BasicLogo";
import HeaderLogo from "../Logo/HeaderLogo";

const SidebarLogo = ({ sidebarExpanded }: { sidebarExpanded?: boolean }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "90px",
        width: !sidebarExpanded ? "90px" : "100%",
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          width: "100%",
        }}
      >
        {!sidebarExpanded && <BasicLogo />}
        {sidebarExpanded && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <HeaderLogo />
          </Box>
        )}
      </Link>
    </Box>
  );
};

export default SidebarLogo;
