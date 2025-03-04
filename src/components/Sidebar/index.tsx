import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { SxProps } from "@mui/material/styles";
import React from "react";
import SidebarListItem from "./SidebarListItem";
import SidebarLogo from "./SidebarLogo";
import { useLocation, useNavigate } from "react-router-dom";
import { sidebarItems } from "@/constants/sidebarItems";
import { icons } from "@/constants/icons";
import { logout, useAuthContext } from "@/context/auth";
import { useTranslation } from "@/translation";
import useReactQuery from "@/hooks/useReactQuery";
import { routePathes } from "@/constants/routePathes";
import { authRequestCollection } from "@/api/auth";

const Sidebar = ({
  expanded,
  setExpanded,
}: {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();

  const sidebarContainerStyle: SxProps = {
    transition: "width 300ms ease-out",
    width: expanded ? "270px" : "90px",
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    backgroundColor: "white",
    zIndex: 1000,
    boxShadow: "3px 0px 23px rgba(206, 213, 216, 0.15)",
    borderRight: `1px solid #eeeeee`,
  };

  const { mutate: userLogout } = useReactQuery({
    ...authRequestCollection.logout,
    onSuccess: () => {
      dispatch(logout());
      navigate(routePathes.auth);
    },
  });

  return (
    <Box
      component={"aside"}
      sx={{
        ...sidebarContainerStyle,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <SidebarLogo sidebarExpanded={expanded} />
        <Divider sx={{ margin: "1rem", marginTop: 0 }} />
        <Stack gap={2}>
          {sidebarItems.map((item, index) => (
            <SidebarListItem
              key={index}
              sidebarExpanded={expanded}
              setSidebarExpanded={setExpanded}
              item={item}
              selected={item.url ? location.pathname.includes(item.url) : false}
            />
          ))}
        </Stack>
      </Box>

      <Box paddingBottom={"1rem"}>
        <Divider sx={{ margin: "1rem", marginTop: 0 }} />
        <SidebarListItem
          customColor="red"
          sidebarExpanded={expanded}
          setSidebarExpanded={setExpanded}
          item={{
            title: t("Logout"),
            icon: icons.logout,
            url: "/",
            onClick: () => userLogout({}),
          }}
          selected={false}
        />
      </Box>
    </Box>
  );
};

export default Sidebar;
