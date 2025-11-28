"use client";

import BookingBadge from "@/components/BookingBadge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import axiosClient from "@/lib/axios-client";
import { showError } from "@/lib/message";
import { BookingMessage, MessageSummaries } from "@/lib/types";
import { cn, initials } from "@/lib/utils";
import { messageValidation } from "@/lib/validation";
import { useUserStore } from "@/store/useUserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-separator";
import { Send } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type messageSchema = z.infer<typeof messageValidation>;

export default function MessagesPage() {
  const { register, handleSubmit, setValue } = useForm<messageSchema>({
    resolver: zodResolver(messageValidation),
  });
  const [pending, setPending] = useState(false);
  const [messages, setMessages] = useState<MessageSummaries>({});
  const [bookingMessages, setBookingMessages] = useState<BookingMessage[]>([]);
  const params = useParams();
  const { user } = useUserStore();
  const uuid = params.uuid;

  const getBookingMessages = async () => {
    try {
      const res = await axiosClient.get(`/messages/${uuid}/get-messages`);
      setBookingMessages(res.data);
      setValue("message", "");
    } catch (res: any) {
      showError(res.response.data.error);
    }
  };

  const getMessages = async () => {
    try {
      const res = await axiosClient.get(`/messages`);
      setMessages(res.data);
    } catch (res: any) {
      showError(res.response.data.error);
    }
  };

  const submitMessage = async (data: messageSchema) => {
    try {
      setPending(true);
      await axiosClient.post(`/messages/${uuid}/send-message`, data);
      getBookingMessages();
    } catch (res: any) {
      showError(res.response.data.error);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    getBookingMessages();
    getMessages();
  }, [uuid]);

  return (
    <Card className="px-4 py-3] flex-row h-[700px]">
      <div className="w-[250px] bg-accent rounded-[12px] p-2">
        <div className="flex flex-col gap-2 w-full justify-start">
          {Object.entries(messages).map(
            ([bookingUuid, bookingMessagesArray]) => (
              <Button
                key={bookingUuid}
                variant="default"
                className="rounded-2xl"
                size="lg"
                asChild
              >
                <Link href={`/messages/${bookingUuid}`} className="text-left">
                  {bookingMessagesArray[0].bookingDescription}
                </Link>
              </Button>
            )
          )}
        </div>
      </div>
      <Separator orientation="vertical" className="h-full" />
      <div className="flex flex-col grow bg-accent rounded-[12px] relative">
        <div className="p-4">
          <h2 className="text-lg font-bold">
            {bookingMessages[0]?.bookingDescription}
          </h2>
          <h4 className="text-base">
            <BookingBadge bookingStatus={bookingMessages[0]?.bookingStatus} />
          </h4>
        </div>
        <Separator orientation="horizontal" className="w-full" />
        <div className="p-4 flex flex-col gap-4">
          {bookingMessages
            .filter((message) => message.bookingUuid === uuid)
            .map((message: BookingMessage) => (
              <div
                key={message.id}
                className={cn(
                  "w-full flex justify-end gap-3",
                  message.userId === user?.id ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[350px] rounded-full py-2 px-4 text-sm",
                    message.userId === user?.id
                      ? "order-1 bg-primary text-background"
                      : "order-2 bg-background text-foreground"
                  )}
                >
                  {message.message}
                </div>
                <Avatar
                  className={cn(
                    "size-10",
                    message.userId === user?.id ? "order-2" : "order-1"
                  )}
                >
                  <AvatarFallback
                    className={cn(
                      message.userId === user?.id
                        ? "bg-primary text-background"
                        : "bg-background text-foreground"
                    )}
                  >
                    {initials(message.user.name)}
                  </AvatarFallback>
                </Avatar>
              </div>
            ))}
        </div>
        <form
          className="absolute bottom-0 w-full"
          onSubmit={handleSubmit(submitMessage)}
        >
          <Textarea
            placeholder="Enter your message"
            className="rounded-b-[12px] h-10"
            id="message"
            disabled={pending}
            {...register("message")}
          />

          <Button
            type="submit"
            variant="ghost"
            className="absolute bottom-1 right-1"
            disabled={pending}
          >
            <Send className="size-5" />
          </Button>
        </form>
      </div>
    </Card>
  );
}
