import axios from "axios";

export const api = axios.create({
  // Use relative URL in production browser so Next.js proxy rewrite handles it
  baseURL: typeof window !== "undefined"
    ? "/api/v1"
    : (process.env.NEXT_PUBLIC_API_URL || "https://chaka-ride-server.vercel.app/api/v1"),
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }
  return config;
});

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can add global error handling here (e.g., logging out on 401)
    return Promise.reject(error);
  }
);
