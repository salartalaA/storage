"use server";

import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import type { LoginData, RegisterData } from "@/schema/auth";

export async function createStore(data: RegisterData) {
  const existingStore = await prisma.store.findUnique({
    select: {
      id: true,
    },
    where: {
      email: data.storeEmail,
    },
  });

  if (existingStore) {
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

export async function loginStore(data: LoginData) {
  const existingStore = await prisma.store.findUnique({
    select: {
      email: true,
      id: true,
      password: true,
    },
    where: {
      email: data.email,
    },
  });

  if (!existingStore) {
    return {
      error: "INVALID_EMAIL" as const,
      success: false,
    };
  }

  const isPasswordCorrect = await bcrypt.compare(
    data.password,
    existingStore.password
  );

  if (!isPasswordCorrect) {
    return {
      error: "INVALID_PASSWORD" as const,
      success: false,
    };
  }

  const sessionId = crypto.randomUUID();

  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

  await prisma.session.create({
    data: {
      expiresAt: expires,
      id: sessionId,
      storeId: existingStore.id,
    },
  });

  const cookieStore = await cookies();

  cookieStore.set("session", sessionId, {
    expires,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return {
    success: true,
  };
}
