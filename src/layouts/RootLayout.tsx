import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useAuthContext } from "@/context/auth";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const RootLayout = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(false);

  const {
    state: { isAuthenticated },
  } = useAuthContext();

  if (!isAuthenticated) return <Navigate to={"/auth"} replace />;

  return (
    <div
      style={{
        maxWidth: "100vw ",
        minHeight: "100vh",
        padding: 0,
        margin: 0,
      }}
    >
      <Sidebar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />

      <Stack
        onClick={() => sidebarExpanded && setSidebarExpanded(false)}
        className={"light-theme"}
        sx={{
          padding: 0,
          maxWidth: {
            xs: "100%",
            sm: "calc(100vw - 90px)",
          },
          ml: "auto",
        }}
      >
        <Navbar
          sidebarExpanded={sidebarExpanded}
          setExpanded={setSidebarExpanded}
        />
        <Box p={{ xs: 2, sm: 4 }}>
          <Outlet />
        </Box>
      </Stack>
    </div>
  );
};

export default RootLayout;
