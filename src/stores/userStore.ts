import { create } from "zustand";

export interface User {
  id: string | number;
  username: string;
  email: string;
  password: string;
}

interface UserStore {
  currentUser: User | null;
  userList: User[];

  loadFromStorage: () => void;
  registerUser: (user: User) => void;
  loginUser: (user: User) => void;
  logoutUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  userList: [],

  loadFromStorage: () => {
    try {
      const storedUsers = localStorage.getItem("user");
      const storedCurrentUser = localStorage.getItem("currentUser");

      set({
        userList: storedUsers ? JSON.parse(storedUsers) : [],
        currentUser: storedCurrentUser ? JSON.parse(storedCurrentUser) : null,
      });
    } catch (error) {
      console.error("Error loading from storage", error);
    }
  },

  registerUser: (user) => {
    set((state) => {
      const updatedUserList = [...state.userList, user];

      localStorage.setItem("user", JSON.stringify(updatedUserList));
      localStorage.setItem("currentUser", JSON.stringify(user));

      return {
        userList: updatedUserList,
        currentUser: user,
      };
    });
  },

  loginUser: (user) => {
    set({ currentUser: user });
    localStorage.setItem("currentUser", JSON.stringify(user));
  },

  logoutUser: () => {
    set({ currentUser: null });
    localStorage.removeItem("currentUser");
  },
}));
