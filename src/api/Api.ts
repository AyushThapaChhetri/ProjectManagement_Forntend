// Importing axios and relevant types from axios package
import axios, { type InternalAxiosRequestConfig, AxiosError } from "axios";

// Create an Axios instance with base URL from environment variable
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Flag to track if token refresh is already in progress
let isRefreshing = false;

// A list of callbacks that wait for the new token after it’s refreshed
let refreshSubscribers: ((token: string | null) => void)[] = [];

// === Request Interceptor ===
// Automatically attach the access token to each request's Authorization header
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers = config.headers || {}; // Ensure headers object exists
      config.headers["Authorization"] = `Bearer ${token}`; // Attach token
    }

    // Log full request URL
    // console.log("[Request]", `${config.baseURL}${config.url}`);

    return config;
  },
  (error) => Promise.reject(error) // Forward any request error
);

// === Response Interceptor ===
// Handles 401 Unauthorized responses and tries to refresh token if needed
api.interceptors.response.use(
  (response) => response, // If response is successful, just return it
  async (error: AxiosError) => {
    // Cast the error config to include optional _retry property
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Skip refresh logic for login or register
    const skipAuthRefresh =
      originalRequest.url?.includes("/login") ||
      originalRequest.url?.includes("/signup");

    // If the error is due to unauthorized access and request has not been retried yet
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !skipAuthRefresh
    ) {
      originalRequest._retry = true; // Mark the request as retried

      // Only one refresh process should happen at a time
      if (!isRefreshing) {
        isRefreshing = true; // Lock refresh process

        try {
          const refreshToken = localStorage.getItem("refreshToken");
          //   if (!refreshToken) return Promise.reject("No refresh token found");
          if (!refreshToken)
            return Promise.reject(new Error("No refresh token found"));

          // Attempt to refresh token using refreshToken
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/refresh`,
            { refreshToken },
            { headers: { "Content-Type": "application/json" } }
          );

          // Extract new tokens from response
          const {
            accessToken,
            refreshToken: newRefreshToken,
          }: { accessToken: string; refreshToken: string } = response.data.data;

          // Save new tokens to local storage
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          // Set the Authorization header with the new token
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

          // Call all pending request subscribers with new token
          refreshSubscribers.forEach((cb) => cb(accessToken));
          refreshSubscribers = [];

          // Retry the original request with new token
          return api(originalRequest);
        } catch (refreshError) {
          // If refresh fails, remove tokens and redirect to login
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";

          // Reject all subscribers with null token
          refreshSubscribers.forEach((cb) => cb(null));
          refreshSubscribers = [];

          return Promise.reject(refreshError); // Forward error
        } finally {
          isRefreshing = false; // Unlock refresh process
        }
      } else {
        // If a refresh is already happening, queue this request
        return new Promise((resolve, reject) => {
          refreshSubscribers.push((accessToken: string | null) => {
            if (accessToken) {
              // Retry the request when token is available
              originalRequest.headers["Authorization"] =
                `Bearer ${accessToken}`;

              resolve(api(originalRequest));
            } else {
              // If token refresh failed, reject the request
              reject(new Error("Refresh token failed"));
            }
          });
        });
      }
    }

    // If error is not 401 or token refresh already failed, just reject it
    return Promise.reject(error);
  }
);

// Export the configured Axios instance for use in API calls
export default api;
