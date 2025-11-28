import type { BookingAttachment } from "@/lib/types";
import { Card } from "./ui/card";
import { File, FileImage, Paperclip } from "lucide-react";

export default function BookingAttachment({
  attachment,
}: {
  attachment: BookingAttachment;
}) {
  const handleViewFile = async (uuid: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/view-attachment/${uuid}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        console.error("Failed to fetch file", response.status);
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const newTab = window.open(url, "_blank", "noopener,noreferrer");
      if (!newTab) {
        console.error("Failed to open new tab");
      }

      setTimeout(() => window.URL.revokeObjectURL(url), 10000);
    } catch (err) {
      console.error("Error viewing attachment:", err);
    }
  };

  return (
    <Card
      className="p-0 w-[150px] flex flex-col gap-0 cursor-pointer"
      onClick={() => handleViewFile(attachment.uuid)}
    >
      <div className="flex items-center justify-center bg-accent aspect-square w-[150px]">
        {attachment.file_type === ".pdf" ? (
          <File className="size-15" />
        ) : attachment.file_type === ".jpg" ||
          attachment.file_type === ".png" ? (
          <FileImage className="size-15" />
        ) : (
          <Paperclip className="size-15" />
        )}
      </div>
      <div className="p-2 w-full truncate">
        <span className="text">{attachment.attachment_name}</span>
      </div>
    </Card>
  );
}
