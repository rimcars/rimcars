import { NavItem } from "@/types/nav-items";

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: "نظرة عامة",
    url: "/dashboard/overview",
    icon: "overview",
    isActive: false,
  },
  {
    title: "السيارات المعروضة",
    url: "/dashboard/listings",
    icon: "listings",
    isActive: false,
  },
  {
    title: "الإعدادات",
    url: "/dashboard/settings",
    icon: "settings",
    isActive: false,
  },
];
