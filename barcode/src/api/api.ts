// src/api/api.ts
import axios from "axios";
import { Platform } from "react-native";

const baseURL =
  Platform.OS === "android"
    ? "http://10.0.2.2:5000"
    : "http://127.0.0.1:5000";

const api = axios.create({
  baseURL,
  timeout: 5000,
});

export default api;
