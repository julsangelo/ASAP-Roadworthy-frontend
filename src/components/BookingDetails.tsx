import { Booking } from "@/lib/types";

export default function BookingDetails({ booking }: { booking: Booking }) {
  return (
    <div>
      <h3>Booking description: {booking.job_description}</h3>
      <h3>Work done: {booking.work_done_description}</h3>
      <h3>Generated ID: {booking.generated_job_id}</h3>
      <h3>Work order date: {booking.work_order_date}</h3>
      <h3>Qoute date: {booking.quote_date}</h3>
      <h3>Edit date: {booking.edit_date}</h3>
      <h3>Created by staff: {booking.created_by_staff_uuid}</h3>
    </div>
  );
}
