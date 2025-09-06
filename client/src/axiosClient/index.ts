import Axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const axiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || "https://practice-sheet.vercel.app",
  timeout: 5000,
});

// Create an axios instance with authentication
export const createAuthenticatedAxios = () => {
  const { getToken } = useAuth();

  // Add auth token to requests
  axiosInstance.interceptors.request.use(async (config) => {
    try {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log("Making request to:", config.url, "with params:", config.params);
      return config;
    } catch (error) {
      console.error("Error getting auth token:", error);
      return config;
    }
  });

  // Add response interceptor for debugging
  axiosInstance.interceptors.response.use(
    (response) => {
      console.log("Response from:", response.config.url, "data:", response.data);
      return response;
    },
    (error) => {
      console.error(
        "API Error:",
        error.config?.url,
        error.response?.status,
        error.response?.data
      );
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

// Export a hook to use the authenticated axios instance
export const useAxios = () => {
  return createAuthenticatedAxios();
};
