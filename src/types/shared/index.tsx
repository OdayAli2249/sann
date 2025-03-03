export type ConfirmProps<T = any> = {
  title?: string;
  message?: string;
  selectedRow?: T;
  onConfirm?: () => void;
  open: boolean;
};

export type VoidCallback = () => void;

export type Alert = (
  message: string,
  type?: "success" | "info" | "warning" | "error",
  title?: string,
  icon?: string,
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  },
  action?: { name: string; callback: () => void }) => void


export interface RequestConfig {
  queryKey: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
}

export interface RequestCollection {
  [key: string]: RequestConfig;
}
