"use client";

import api from "./api";
import { removeCookie } from "./cookieFunction";

export const currentUserDataHelper = async (
  access_token: string,
  router: any
) => {
  try {
    const res = await api.get(`/auth/verify/${access_token}`);
    if (res.data) {
      const { data } = res;
      if ((data.status = "success" && data.payload)) {
        router.push("/cars");
        return true;
      }
    }
  } catch (error) {
    removeCookie("access_token");
    router.push("/auth/login");
    return false;
  }
};

export const currentUserData = async (access_token: string) => {
  try {
    const res = await api.get(`/auth/verify/${access_token}`);
    if (res.data) {
      const { data } = res;
      if ((data.status = "success" && data.payload)) {
        return res.data;
      }
    }
  } catch (error) {
    removeCookie("access_token");
    return false;
  }
};
