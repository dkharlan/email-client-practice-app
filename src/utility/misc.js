import moment from 'moment';
import { MessageDetails } from "../ui/types";

// from https://stackoverflow.com/questions/7885096/how-do-i-decode-a-string-with-escaped-unicode
export const unescape = (s: string) => {
  return JSON.parse('"' + s.replace('"', '\\"') + '"');
};

// from https://github.com/moment/moment/issues/3163
export const byTimeDescending = (a: MessageDetails, b: MessageDetails) => {
  const theFuture = moment('10000-01-01');
  const dateA = a.date || theFuture;
  const dateB = b.date || theFuture;
  return dateB.diff(dateA);
};

export const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
