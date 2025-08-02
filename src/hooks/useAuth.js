import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../components/utility/axios";

// API functions
const authAPI = {
  login: async (credentials) => {
    const response = await axiosInstance.post("/login", credentials);
    return response.data;
  },

  logout: async () => {
    const response = await axiosInstance.post("/logout");
    return response.data;
  },

  getProfile: async () => {
    const response = await axiosInstance.get("/profile");
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await axiosInstance.post("/profile", userData);
    return response.data;
  },

  // Google SSO should redirect to the server endpoint, not make a direct API call
  googleAuth: async () => {
    // This will redirect to the server's Google SSO endpoint
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || window.location.origin;
    window.location.href = `${baseUrl}/google`;
    // Note: This function won't return anything because of the redirect
    return null;
  },
};

// Custom hooks
export const useProfile = (onSuccess, onError) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: authAPI.getProfile,
    retry: (failureCount, error) => {
      // Don't retry on 401/404 (user not logged in)
      if (error?.response?.status === 401 || error?.response?.status === 404) {
        return false;
      }
      return failureCount < 2;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    onSuccess,
    onError,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      // Invalidate and refetch profile data
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      // Set profile data immediately
      queryClient.setQueryData(["profile"], data.user);
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });
};

export const useGoogleAuth = () => {
  return useMutation({
    mutationFn: authAPI.googleAuth,
    onSuccess: () => {
      // The redirect will happen automatically
      // We don't need to do anything here as the user will be redirected
      console.log("Redirecting to Google SSO...");
    },
    onError: (error) => {
      console.error("Google SSO error:", error);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      // Remove profile data from cache
      queryClient.removeQueries({ queryKey: ["profile"] });
      // Reset profile data
      queryClient.setQueryData(["profile"], null);
    },
    onError: (error) => {
      console.error("Logout error:", error);
      // Even if logout API fails, clear local cache
      queryClient.removeQueries({ queryKey: ["profile"] });
      queryClient.setQueryData(["profile"], null);
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authAPI.updateProfile,
    onSuccess: (data) => {
      // Update profile data in cache
      queryClient.setQueryData(["profile"], data.user);
    },
    onError: (error) => {
      console.error("Update profile error:", error);
    },
  });
};
