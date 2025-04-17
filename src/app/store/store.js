import {create} from 'zustand'
import axiosInstance from '../../components/utility/axios'

const initialState = {
  session: null,
  user: null,
  loading: true,
  error: null,
};

const useStore = create((set, get) => ({
  ...initialState,

  validateSession: async () => {
    const currentUser = get().user;
    if (currentUser) {
      console.log("User already logged in");
      return; // Avoid unnecessary API call if user is already logged in
    }

    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/profile"); // Make the request
      const data = response.data; // Extract data from response
      const user =
        (Array.isArray(data.body) && data.body.length === 0) ||
        (typeof data.body === "object" && Object.keys(data.body).length === 0)
          ? null
          : data;
      set({
        user: user,
        loading: false,
        error: null,
      });
      console.log("User session validated:", data.body);
    } catch (error) {
      console.error("Error validating session:", error);
      set({
        user: null,
        loading: false,
        error: error.response?.data?.message || "Failed to validate session",
      });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/logout"); // Call logout endpoint if available
      set(initialState); // Reset state to initial values
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
      set({ error: error.response?.data?.message || "Failed to log out" });
    }
  },

  updateUser: async () => {
    try {
      const response = await axiosInstance.get("/profile");
      const data = await response.data;
      set({ user: data });
    } catch (error) {
      console.error("Error updating user:", error);
      set({ error: error.message });
    }
  },
}));

export default useStore;
