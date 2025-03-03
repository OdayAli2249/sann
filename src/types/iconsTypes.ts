export type IIconType = {
  id: number;
  name: string;
  icon: string;
  width: number;
  height: number;
  colorLight: string;
  colorDark: string;
  bgColorLight: string;
  bgColorDark: string;
  defaultBgColorLight: string;
  defaultBgColorDark: string;
  onClick: (id?: string, data?: any) => void;
  hasPermission?: boolean;
};