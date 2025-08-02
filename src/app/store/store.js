import { create } from "zustand";

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
  initialized: false,
};

const useStore = create((set) => ({
  ...initialState,

  // Set user data (called from TanStack Query hooks)
  setUser: (user) => {
    set({
      user,
      isAuthenticated: !!user,
      error: null,
      initialized: true,
    });
    console.log("User set in store:", user);
  },

  // Clear user data (called from TanStack Query hooks)
  clearUser: () => {
    set({
      user: null,
      isAuthenticated: false,
      error: null,
      initialized: true,
    });
    console.log("User cleared from store");
  },

  // Set error
  setError: (error) => {
    set({ error });
    console.log("Error set in store:", error);
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Set initialization status
  setInitialized: (initialized) => {
    set({ initialized });
  },

  // Reset store to initial state
  reset: () => {
    set(initialState);
    console.log("Store reset to initial state");
  },
}));

export default useStore;
