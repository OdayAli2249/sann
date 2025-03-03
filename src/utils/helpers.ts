import config from "@/config";
import { SxProps } from '@mui/material';
import { CSSProperties } from 'react';
import { APIResponse, QueryObject } from "@/types/customTypes";
import dayjs from "dayjs";
import queryString from "query-string";
import { InfiniteData } from "@tanstack/react-query";

export const calculateSpacing = (pixels: number) => pixels / config.style.spacing;
export const transformFirstLetterToUppercase = (name: string) => {
  return name.replace(/\b([a-zÁ-ú]{3,})/g, (w) => w.charAt(0).toUpperCase() + w.slice(1));
};

export const formatDate = (date: string | Date, format?: string) =>
  dayjs(date).isValid() ? dayjs(date).format(format ? format : "DD MMM YYYY - h:mm a") : "-";

export const removeIgnoredUrlParams = (queryFilter: queryString.ParsedQuery<string | number | boolean>,
  ignoredkeys: string[]
) => {
  for (var key of ignoredkeys)
    delete queryFilter[key];
  return queryFilter;
}

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

export const getStandardUrlFrom = (url: string) => url.replace(/\/profile\/[a-zA-Z0-9]+$/, "/profile/:id")

export const transformPascalCase = (str: string) => str?.replace(/([a-z])([A-Z])/g, "$1 $2");

export const transformUnderscoreToSpace = (str: string) =>
  str && typeof str === "string" ? str.replaceAll("_", " ") : "";


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

export const minutesToIsoTime = (minutes: number): string => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  currentDate.setMinutes(minutes);
  return currentDate.toISOString();
};

export const minutesToLocalTime = (minutes: number): string => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  currentDate.setMinutes(minutes);
  return currentDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
};

export const isoTimeToMinutes = (timeString: string): number => {
  const date = new Date(timeString);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  return hours * 60 + minutes;
};

export const mergeSx = <T extends SxProps | CSSProperties = SxProps>(
  style: T,
  ...args: (SxProps | CSSProperties | any | undefined)[]
): T => Object.assign({}, style, ...args);

export const mergePagesData = <T = any>(
  data: InfiniteData<APIResponse<{ [k: string]: T[] }>> | undefined,
  key: string,
) => {
  let output: T[] = [];
  data?.pages?.forEach((page) =>
    page?.data // quick fix until backend solves the issue with standard response
      ? page?.data?.[key]?.forEach((item: T) => output?.push(item))
      : (page as any)?.[key]?.forEach((item: T) => output?.push(item)),
  );

  return output;
};
