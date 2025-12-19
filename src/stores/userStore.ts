import { create } from "zustand";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

interface UserStore {
  currentUser: User | null;
  userList: User[];

  loadFromStorage: () => void;
  saveToStorage: () => void;
  registerUser: (user: User) => void;
  loginUser: (user: User) => void;
  logoutUser: () => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  currentUser: null,
  userList: [],

  loadFromStorage: () => {
    const storedUsers = localStorage.getItem("user");
    const storedCurrentUser = localStorage.getItem("currentUser");

    if (storedUsers) {
      try {
        set({ userList: JSON.parse(storedUsers) });
      } catch (err) {
        console.error("Error parsing user list", err);
      }
    }

    if (storedCurrentUser) {
      try {
        set({ currentUser: JSON.parse(storedCurrentUser) });
      } catch (err) {
        console.error("Error parsing current user", err);
      }
    }
  },

  saveToStorage: () => {
    const { userList, currentUser } = get();
    localStorage.setItem("user", JSON.stringify(userList));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  },

  registerUser: (user) => {
    const { userList, saveToStorage } = get();

    set({
      userList: [...userList, user],
      currentUser: user,
    });

    saveToStorage();
  },

  loginUser: (user) => {
    set({ currentUser: user });
    get().saveToStorage();
  },

  logoutUser: () => {
    set({ currentUser: null });
    localStorage.removeItem("currentUser");
  },
}));
