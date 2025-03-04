import { SidebarItem } from "@/types/customTypes";
import { icons } from "@/constants/icons";
import { routePathes } from "./routePathes";

export const sidebarItems: SidebarItem[] = [
    {
        title: "Home",
        icon: icons.linkedin,
        url: routePathes.home,
    },
    {
        title: "Settings",
        icon: icons.banner,
        url: routePathes.auth,
    },
];
