import { SxProps } from '@mui/material';
import { CSSProperties } from 'react';
import { QueryObject } from "@/types/customTypes";
import { SX } from '@/types/shared';


export const mergeSx = <T extends SxProps | SX | CSSProperties = SxProps>(
  style: T,
  ...args: (SxProps | CSSProperties | any | undefined)[]
): T => Object.assign({}, style, ...args);

export const calculateSpacing = (pixels: number) => pixels / 8;
export const transformFirstLetterToUppercase = (name: string) => {
  return name.replace(/\b([a-zÁ-ú]{3,})/g, (w) => w.charAt(0).toUpperCase() + w.slice(1));
};

export const filterQueryObject = (obj?: QueryObject) => {
  const newObject: QueryObject = {};
  if (obj) {
    Object.keys(obj).forEach((key) => {
      if (obj[key] === false) newObject[key] = false;
      else if (obj[key] === null) newObject[key] = "";
      else if (obj[key] || obj[key] === 0) newObject[key] = obj[key];
    });
  }

  return newObject;
};

export const generatePassword = (
  length = 20,
  characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$",
) =>
  Array.from(crypto.getRandomValues(new Uint32Array(length)))
    .map((x) => characters[x % characters.length])
    .join("");

export const checkSpecialCharacters = (phrase: string) => {
  return new RegExp("[$&+,:;=?@#|'<>.^*()%!-]").test(phrase);
};

export const checkUppcaseAndLowercase = (phrase: string) => {
  return new RegExp("^(?=.*[a-z])(?=.*[A-Z])").test(phrase);
};
