import { Booking } from "@/lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "./ui/card";
import BookingBadge from "./BookingBadge";
import { formatDateTime } from "@/lib/utils";
import BookingAttachment from "./BookingAttachment";
import { Button } from "./ui/button";
import Link from "next/link";
import BookingDetails from "./BookingDetails";

export default function BookingAccordion({ booking }: { booking: Booking }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <Card className="py-2 px-5">
        <AccordionItem value={booking.uuid}>
          <AccordionTrigger className="cursor-pointer">
            <div className="flex justify-between w-full">
              {booking.job_description}

              <div className="flex gap-5 items-center">
                <span className="text-xs">
                  {formatDateTime(booking.work_order_date)}
                </span>
                <BookingBadge bookingStatus={booking.status} />
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <BookingDetails booking={booking} />
            {booking.attachments.length > 0 && (
              <>
                <h3>Attachments</h3>
                <div className="flex gap-3">
                  {booking.attachments.map((attachment) => (
                    <BookingAttachment
                      key={attachment.uuid}
                      attachment={attachment}
                    />
                  ))}
                </div>
              </>
            )}
            <Button className="w-fit rounded-2xl">
              <Link href={`/messages/${booking.uuid}`}>
                Message about this booking
              </Link>
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Card>
    </Accordion>
  );
}
