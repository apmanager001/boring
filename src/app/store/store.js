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
  },

  // Clear user data (called from TanStack Query hooks)
  clearUser: () => {
    set({
      user: null,
      isAuthenticated: false,
      error: null,
      initialized: true,
    });
  },

  // Set error
  setError: (error) => {
    set({ error });
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
  },
}));

export default useStore;
