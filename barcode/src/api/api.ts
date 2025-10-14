import axios from "axios";

// ANDROID emülatör için bilgisayarın localhost'u 10.0.2.2
const api = axios.create({
  baseURL: "http://10.0.2.2:5000",
  timeout: 5000,
});

export default api;
