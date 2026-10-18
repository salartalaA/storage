"use server";

import { getCurrentStore } from "@/actions/auth";
import prisma from "@/lib/prisma";

export async function getStoreSuppliers() {
  const currentStore = await getCurrentStore();

  if (!currentStore) {
    return null;
  }

  const currentStoreSuppliers = await prisma.supplier.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      storeId: currentStore.id,
    },
  });

  return currentStoreSuppliers;
}
