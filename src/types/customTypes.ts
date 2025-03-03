// import { Actions, Services } from "@/hooks/roles/roles";
import { ReactNode } from "react";

export interface SidebarItem {
  title: string;
  icon?: string;
  url?: string;
  items?: {
    icon?: string;
    title: string;
    url: string;
    resource?: string;
  }[];
  onClick?: () => void;
}

export interface RouteItem {
  path: string;
  component: ReactNode;
  protected?: boolean;
  roles?: string[];
}

export interface LabelValue {
  label?: string;
  value: any;
}

export interface AddLabelValue {
  key: string;
  value: any;
}

export type APIResponse<T = unknown> = {
  success?: boolean;
  data?: T;
  message: string;
  errors?: {
    [key: string]: string[] | string;
  }
};

export interface QueryObject {
  [key: string]: boolean | string | number | undefined | any[] | null;
}

export interface EndPoint {
  url: string;
  queryKey: string;
  dataKey?: string;
  dto?: (data: any) => any;
}

export type Record<K extends string | number | symbol, V> = {
  [key in K]: V;
};

export interface GenericObject<T = any> {
  [key: string]: T;
}

export interface ITransferListItem {
  id: string;
  title: string;
  subtitle?: string;
  asideTitle?: string;
  avatar?: string;
}
export type AddPageMode = "add" | "edit" | "copy";
