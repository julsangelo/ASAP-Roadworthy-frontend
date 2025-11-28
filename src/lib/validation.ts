import z from "zod";

export const logInValidation = z.object({
  identifier: z
    .string()
    .min(1, "Email or phone number is required")
    .superRefine((val, ctx) => {
      if (val.startsWith("+")) {
        // validate phone number
        if (!/^\+\d{7,15}$/.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Phone number is invalid",
          });
        }
      } else {
        // validate email
        if (!/\S+@\S+\.\S+/.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Email is invalid",
          });
        }
      }
    }),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const messageValidation = z.object({
  message: z.string().min(1, "Message is required"),
});
