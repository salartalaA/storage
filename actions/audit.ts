"use server";

import { getCurrentStore } from "@/actions/auth";
import prisma from "@/lib/prisma";

export async function getStoreAuditLogs(limit = 6) {
  const currentStore = await getCurrentStore();

  if (!currentStore) {
    return [];
  }

  return prisma.auditLog.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
    where: {
      storeId: currentStore.id,
    },
  });
}
