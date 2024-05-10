"use client";

import api from "./api";
import { removeCookie } from "./cookieFunction";

export default async (access_token: string, router: any) => {
  try {
    const res = await api.get(`/auth/verify/${access_token}`);
    if (res.data) {
      const { data } = res;
      if (data.payload._id) {
        return true;
      }
    }
    router.push("/cars");
  } catch (error) {
    router.push("/auth/login");
    removeCookie("access_token");
    return false;
  }
};
