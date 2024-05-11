"use client";

import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setCookie = (key: string, value: string, options?: any) => {
  // Calculate expiration date 2 days from now
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 20);

  // Set the cookie with maxAge option
  cookies.set(key, value, { ...options, expires: expirationDate, path: "/" });
};

export const getCookie = (key: string) => {
  return cookies.get(key);
};

export const removeCookie = async (key: string) => {
  return await cookies.remove(key, { path: "/" });
};
