import axios from "axios";
import { env } from "@/env";

export const pizzaApi = axios.create({
  baseURL: env.NEXT_API_BASE_URL,
  withCredentials: true,

})