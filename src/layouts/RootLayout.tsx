import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import RightDrawer from "@/components/RightDrawer";
import { useAuthContext } from "@/context/auth";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Layout } from "@/types/shared";

const RootLayout = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const location = useLocation();
  const nextSearchParams = new URLSearchParams(location.search);
  const layout: Layout = nextSearchParams.get('layout') as Layout ?? "vertical";
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false); // Track right drawer

  const {
    state: { isAuthenticated },
  } = useAuthContext();

  useEffect(() => {
    setRightDrawerOpen(false)
  }, [layout])

  if (!isAuthenticated) return <Navigate to={"/auth"} replace />;

  return (
    <Box
      sx={{
        maxWidth: "100vw",
        minHeight: "100vh",
        padding: 0,
        margin: 0,
        display: "flex",
        position: 'relative'
      }}
    >
      {/* Sidebar (Only visible when Vertical Menu is active) */}
      {layout === "vertical" && (
        <Sidebar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />
      )}

      {/* Main Content Area */}
      <Stack
        className="light-theme"
        sx={{
          transition: "margin-left 300ms ease-out, margin-right 300ms ease-out",
          marginLeft: layout === "vertical" ? (sidebarExpanded ? "270px" : "90px") : 0,
          width: "100%",
        }}
      >
        <Navbar
          sidebarExpanded={sidebarExpanded}
          setExpanded={setSidebarExpanded}
          layout={layout}
          rightDrawerOpen={rightDrawerOpen}
          setRightDrawerOpen={setRightDrawerOpen}
        />
        <Box pb={2} pr={2}>
          <Outlet />
        </Box>
      </Stack>

      {/* Right Drawer Settings */}
      <RightDrawer
        rightDrawerOpen={rightDrawerOpen}
        layout={layout}
        setRightDrawerOpen={setRightDrawerOpen} />
    </Box>
  );
};

export default RootLayout;
