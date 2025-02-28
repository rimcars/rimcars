import { Icons } from "@/components/icons";

export interface NavItem {
    title: string;
    url: string;
    icon?: keyof typeof Icons;
    isActive?: boolean;
  }