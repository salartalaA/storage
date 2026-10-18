"use server";

import { getCurrentStore } from "@/actions/auth";
import prisma from "@/lib/prisma";

export async function getStoreLocations() {
  const currentStore = await getCurrentStore();

  if (!currentStore) {
    return null;
  }

  const currentStoreLocations = await prisma.location.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      storeId: currentStore.id,
    },
  });

  return currentStoreLocations;
}
