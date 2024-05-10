import axios, { AxiosInstance } from "axios";

const baseURL: string = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const api: AxiosInstance = axios.create({
  baseURL: baseURL,
});

export default api;
