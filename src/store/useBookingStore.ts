"use client";

import { create } from "zustand";
import axiosClient from "@/lib/axios-client";
import { Booking } from "@/lib/types";

interface BookingStore {
  bookings: Booking[];
  setBookings: (bookings: Booking[]) => void;
  fetchBookings: () => Promise<void>;
}

export const useBookingStore = create<BookingStore>((set) => ({
  bookings: [],
  setBookings: (bookings) => set({ bookings }),
  fetchBookings: async () => {
    try {
      const res = await axiosClient.get("/bookings");
      set({ bookings: res.data });
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  },
}));
