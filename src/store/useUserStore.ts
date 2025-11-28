"use client";

import { create } from "zustand";
import axiosClient from "@/lib/axios-client";
import { User } from "@/lib/types";

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    try {
      const res = await axiosClient.get("/auth/check-session");
      set({ user: res.data.user });
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  },
}));
