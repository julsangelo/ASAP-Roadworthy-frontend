import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

export default function BookingBadge({
  bookingStatus,
}: {
  bookingStatus: string;
}) {
  return (
    <Badge
      className={cn(
        bookingStatus === "Quote " && "bg-orange-500",
        bookingStatus === "Work Order" && "bg-blue-500",
        bookingStatus === "Completed" && "bg-green-500",
        bookingStatus === "Unsuccessful" && "bg-red-500",
        "text-white"
      )}
    >
      {bookingStatus}
    </Badge>
  );
}
