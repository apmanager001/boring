import { create } from "zustand";
import axiosInstance from "../../components/utility/axios";

const initialState = {
  session: null,
  user: null,
  loading: false, // Changed from true to false to prevent infinite loading
  error: null,
  initialized: false, // Add flag to prevent multiple initializations
};

const useStore = create((set, get) => ({
  ...initialState,

  login: async (username, password) => {
    try {
      console.log("Attempting login...");
      set({ loading: true, error: null });

      const response = await axiosInstance.post("/login", {
        username,
        password,
      });
      const { user, message } = response.data;

      if (user) {
        set({
          user: user,
          loading: false,
          error: null,
          initialized: true,
        });
        console.log("Login successful:", user);
        return { success: true, user };
      } else {
        set({
          user: null,
          loading: false,
          error: "Login failed - no user data received",
          initialized: true,
        });
        console.log("Login failed - no user data");
        return { success: false, error: "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.error || "Login failed";
      set({
        user: null,
        loading: false,
        error: errorMessage,
        initialized: true,
      });
      return { success: false, error: errorMessage };
    }
  },

  validateSession: async () => {
    const { user, initialized } = get();

    console.log("validateSession called with state:", {
      user,
      initialized,
      loading: get().loading,
    });

    // Prevent multiple simultaneous calls
    if (get().loading) {
      console.log("Session validation already in progress");
      return;
    }

    // If already initialized and user exists, don't validate again
    if (initialized && user) {
      console.log("User already logged in, skipping validation");
      return;
    }

    console.log("Setting loading to true and starting validation...");
    set({ loading: true, error: null });

    try {
      console.log("Making API call to /profile...");
      const response = await axiosInstance.get("/profile");
      const userData = response.data;

      console.log("API response received:", userData);

      // Check if we got valid user data
      if (userData && userData.id) {
        console.log("Valid user data found, setting user state");
        set({
          user: userData,
          loading: false,
          error: null,
          initialized: true,
        });
        console.log("User session validated:", userData);
      } else {
        console.log("No valid user data in response, setting user to null");
        set({
          user: null,
          loading: false,
          error: null,
          initialized: true,
        });
        console.log("No valid user session found");
      }
    } catch (error) {
      console.error("Session validation error:", error);

      // Handle different error types
      if (error.response?.status === 404) {
        // No user logged in - this is normal for non-logged in users (as per OpenAPI spec)
        console.log("404 received - no user logged in, setting user to null");
        set({
          user: null,
          loading: false,
          error: null,
          initialized: true,
        });
        console.log("No user logged in (404) - showing login button");
      } else if (error.response?.status === 401) {
        // Not authenticated - this is normal for non-logged in users
        console.log(
          "401 received - user not authenticated, setting user to null"
        );
        set({
          user: null,
          loading: false,
          error: null,
          initialized: true,
        });
        console.log("User not authenticated (401) - showing login button");
      } else {
        // Other errors
        console.log("Other error received:", error.response?.status);
        set({
          user: null,
          loading: false,
          error: error.response?.data?.message || "Failed to validate session",
          initialized: true,
        });
        console.log(
          "Other error during session validation:",
          error.response?.status
        );
      }
    }
  },

  logout: async () => {
    try {
      console.log("Logging out...");
      await axiosInstance.post("/logout");
      set(initialState); // Reset state to initial values
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
      // Even if logout API fails, clear local state
      set(initialState);
      set({ error: error.response?.data?.message || "Failed to log out" });
    }
  },

  updateUser: async () => {
    try {
      const response = await axiosInstance.get("/profile");
      const userData = response.data;

      if (userData && userData.id) {
        set({ user: userData, error: null });
        console.log("User updated:", userData);
      } else {
        set({ user: null, error: null });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      set({ error: error.message });
    }
  },

  // Add method to clear errors
  clearError: () => {
    set({ error: null });
  },

  // Add method to reset store
  reset: () => {
    set(initialState);
  },
}));

export default useStore;
