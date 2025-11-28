"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { logInValidation } from "@/lib/validation";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { showError, showSuccess } from "@/lib/message";
import axiosClient from "@/lib/axios-client";
import { Spinner } from "./ui/spinner";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

type logInSchema = z.infer<typeof logInValidation>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<logInSchema>({
    resolver: zodResolver(logInValidation),
  });
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const submitLogIn = async (data: logInSchema) => {
    try {
      setPending(true);
      const res = await axiosClient.post("/auth/login", data);
      showSuccess(res.data.message);
      router.push("/");
    } catch (res: any) {
      showError(res.response.data.error);
    } finally {
      setPending(false);
    }
  };

  return (
    <Card className="w-[550px] m-4">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl font-bold gap-4">
          <Image
            src="/images/ASAPRoadWorthyLogo.webp"
            alt="ASAP Roadworthy Logo"
            width={200}
            height={69}
          />
          Customer <br />
          Portal
        </CardTitle>
        <CardDescription>
          Log in to view your car service bookings, check booking details, and
          stay updated with your technician.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submitLogIn)}>
          <FieldGroup>
            <Field data-invalid={errors.identifier ? "true" : "false"}>
              <FieldLabel>Email or phone number</FieldLabel>
              <FieldDescription>
                Phone number must start with country code (ex. +63)
              </FieldDescription>
              <Input
                placeholder="Your email or phone number"
                id="identifier"
                type="text"
                disabled={pending}
                {...register("identifier")}
                aria-invalid={errors.identifier ? "true" : "false"}
              />
              {errors.identifier && (
                <FieldError>{errors.identifier.message}</FieldError>
              )}
            </Field>
            <Field data-invalid={errors.password ? "true" : "false"}>
              <FieldLabel>Password</FieldLabel>
              <div className="relative">
                <Input
                  placeholder="Your password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  disabled={pending}
                  autoComplete="off"
                  {...register("password")}
                  aria-invalid={errors.password ? "true" : "false"}
                />
                <Button
                  variant="ghost"
                  className="absolute right-0 top-0"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>
              {errors.password && (
                <FieldError>{errors.password.message}</FieldError>
              )}
            </Field>
            <Field>
              <Button type="submit" className="rounded-full" disabled={pending}>
                {pending ? <Spinner /> : "Log in"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
