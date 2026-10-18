import { z } from "zod";

export const locationSchema = z.object({
  name: z.string().trim().min(1, "لطفا نام مکان را وارد کنید"),
});

export type LocationData = z.infer<typeof locationSchema>;
