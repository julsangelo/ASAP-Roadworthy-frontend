"use client";

import BookingAccordion from "@/components/BookingAccordion";
import { Booking } from "@/lib/types";
import { useBookingStore } from "@/store/useBookingStore";
import { useEffect } from "react";

export default function BookingsPage() {
  const { bookings, fetchBookings } = useBookingStore();

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      {bookings.map((booking: Booking) => (
        <BookingAccordion key={booking?.uuid} booking={booking} />
      ))}
    </div>
  );
}
