import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { SxProps } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { SidebarItem } from "../../types/customTypes";
import SidebarListItem from "./SidebarListItem";
import SidebarLogo from "./SidebarLogo";
import { useLocation } from "react-router-dom";
import zIndexes from "@/constants/zIndexes";
import { sidebarItems } from "@/constants/sidebarItems";
import { icons } from "@/constants/icons";
import { logout, useAuthContext } from "@/context/auth";
import { useTranslation } from "@/translation";

const Sidebar = ({
  expanded,
  setExpanded,
}: {
  expanded: boolean;
  setExpanded: React.Dispatch<boolean>;
}) => {
  const { dispatch } = useAuthContext();
  const { t } = useTranslation();

  const [containerWidth, setContainerWidth] = useState<string | number | null>(
    null
  );
  const location = useLocation();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const sidebarContainerStyle: SxProps = {
    transition: "width ease-out 300ms",
    left: 0,
    width: { xs: expanded ? 320 : 0, sm: expanded ? "270px" : "90px" },
    border: `1px solid ${theme.palette.primary[10]}`,
    position: "fixed",
    top: 0,
    backgroundColor: "background.navbar",
    overflowX: expanded ? "visible" : "hidden",
    zIndex: zIndexes.sidebar,
  };

  useEffect(() => {
    renderContainerWidth();
  }, [smallScreen, expanded]);

  const renderContainerWidth = () => {
    if (smallScreen && expanded) {
      setContainerWidth("85%");
    } else if (smallScreen && !expanded) {
      setContainerWidth("0");
    } else {
      setContainerWidth(null);
    }
  };

  return (
    <Box
      component={"aside"}
      minHeight={"100vh"}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      sx={{
        ...sidebarContainerStyle,
        boxShadow: (theme) =>
          theme.palette.mode === "dark"
            ? "3px 0px 25px rgba(32, 35, 45, 0.12);"
            : "3px 0px 23px rgba(206, 213, 216, 0.15)",
        width: containerWidth,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "white",
      }}
    >
      <Box>
        {!smallScreen && <SidebarLogo sidebarExpanded={expanded} />}
        <Divider sx={{ margin: "1rem", marginTop: 0 }} />
        <Box
          width={{ xs: expanded ? "320" : 0, sm: expanded ? 270 : 90 }}
          sx={{
            transition: "all 0.3s",
          }}
        >
          <Stack
            gap={2}
            sx={
              smallScreen
                ? {
                  height: "fit-content",
                  maxHeight: "50vh",
                  overflowY: "scroll",
                  scrollbarWidth: "none",
                }
                : {}
            }
          >
            {sidebarItems.map((item: SidebarItem, index) => {
              return (
                <Box key={index}>
                  <SidebarListItem
                    sidebarExpanded={expanded}
                    setSidebarExpanded={setExpanded}
                    item={item}
                    selected={
                      item.url ? location.pathname.includes(item.url) : false
                    }
                  />
                </Box>
              );
            })}
          </Stack>
        </Box>
      </Box>
      <Box paddingBottom={"1rem"}>
        <Divider sx={{ margin: "1rem", marginTop: 0 }} />
        <SidebarListItem
          customColor={theme.palette.error.main}
          sidebarExpanded={expanded}
          setSidebarExpanded={setExpanded}
          item={{
            title: t("Logout"),
            icon: icons.logout,
            url: "/",
            onClick: () => {
              dispatch(logout());
            },
          }}
          selected={false}
        />
      </Box>
    </Box>
  );
};

export default Sidebar;
