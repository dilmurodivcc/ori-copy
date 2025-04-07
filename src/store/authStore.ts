import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  toggleAuth: () => void;
  checkAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  checkAuth: () => {
    const authToken = localStorage.getItem('access_token');
    set({ isAuthenticated: !!authToken });
  },
  toggleAuth: () => {
    const authToken = localStorage.getItem('access_token');
    if (authToken) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      set({ isAuthenticated: false });
    }
    window.location.reload();
  },
}));

export default useAuthStore;
