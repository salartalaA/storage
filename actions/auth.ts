"use server";

import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import type { RegisterData } from "@/schema/auth";

export async function createStore(data: RegisterData) {
  const existingEmail = await prisma.store.findUnique({
    select: {
      id: true,
    },
    where: {
      email: data.storeEmail,
    },
  });

  if (existingEmail) {
    return {
      error: "EMAIL_ALREADY_EXISTS" as const,
      success: false,
    };
  }

  const salt = 12;

  const hashedPassword = await bcrypt.hash(data.storePassword, salt);

  await prisma.store.create({
    data: {
      email: data.storeEmail,
      name: data.storeName,
      password: hashedPassword,
    },
  });

  return {
    success: true,
  };
}
