import { softApi } from "@/config/config";
import axios from "axios";
let local = null;
if (typeof window !== 'undefined') {
  local = localStorage.getItem('access_token');
}

const axiosRequest = axios.create({
  baseURL: softApi,
  headers: {
    Authorization: `Bearer ${local}`,
  },
});

export default axiosRequest;
