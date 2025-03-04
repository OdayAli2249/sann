import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import ColoredSvg from "../ColoredSvg";
import { useTheme } from "@mui/material";
import { icons } from "@/constants/icons";

const SidebarLogo = ({ sidebarExpanded }: { sidebarExpanded?: boolean }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: { xs: "3rem", sm: "3.375rem" },
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
        <ColoredSvg style={{ marginLeft: 32 }}
          height={24}
          width={24}
          src={icons.information}
          color={theme.palette.primary.main}
        />
      </Link>
    </Box>
  );
};

export default SidebarLogo;
