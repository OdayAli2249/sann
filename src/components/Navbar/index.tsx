import { AppBar, Toolbar, IconButton, Box, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { sidebarItems } from "@/constants/sidebarItems";
import SettingsIcon from "@mui/icons-material/Settings";
import SidebarListItem from "../Sidebar/SidebarListItem";
import { useLocation } from "react-router-dom";
import { Layout } from "@/types/shared";

type PropTypes = {
  sidebarExpanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  setRightDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  layout: Layout;
  rightDrawerOpen: boolean;
};

const Navbar = ({ sidebarExpanded, setExpanded, layout, setRightDrawerOpen }: PropTypes) => {
  const location = useLocation();

  return (
    <>
      {/* Main Navbar */}
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "white",
          height: { xs: "3rem", sm: "3.375rem" },
          transition: "width 300ms ease-out, margin-right 300ms ease-out",
          width: layout === "vertical" ?
            `calc(100%-${sidebarExpanded ? "270px" : "90px"})` : "100%",
          ml: "auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid #eeeeee`,
          zIndex: 1100, // Ensure visibility
          boxShadow: "none", // Remove elevation
        }}
        position="sticky"
      >
        <Toolbar sx={{
          width: "100%", display: "flex",
          justifyContent: layout === "horizontal" ? "flex-end" : "space-between"
        }}>
          {/* Sidebar Toggle Button */}
          {layout === "vertical" && (
            <IconButton edge="start" color="primary" onClick={() => setExpanded((prev) => !prev)}>
              <MenuIcon />
            </IconButton>
          )}
          <IconButton
            color="primary"
            onClick={() => {
              setRightDrawerOpen(true);
            }}
          >
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Horizontal Menu Bar */}
      {layout === "horizontal" && (
        <Box
          sx={{
            backgroundColor: "#f8f8f8",
            padding: "0.5rem",
            display: "flex",
            justifyContent: "center",
            position: "relative",
            zIndex: 1000, // Ensure it appears
            borderBottom: "1px solid #ddd",
          }}
        >
          <Stack direction="row" spacing={2}>
            <Stack direction="row" gap={2}>
              {sidebarItems.map((item, index) => (
                <SidebarListItem
                  key={index}
                  sidebarExpanded={true}
                  setSidebarExpanded={setExpanded}
                  item={item}
                  selected={item.url ? location.pathname.includes(item.url) : false}
                />
              ))}
            </Stack>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default Navbar;
