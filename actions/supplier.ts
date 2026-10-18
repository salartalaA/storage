"use server";

import { revalidatePath } from "next/cache";
import { getCurrentStore } from "@/actions/auth";
import prisma from "@/lib/prisma";
import { type SupplierData, supplierSchema } from "@/schema/supplier";

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

export async function addStoreSupplier(data: SupplierData) {
  const currentStore = await getCurrentStore();

  if (!currentStore) {
    return null;
  }

  const newSafeSupplier = supplierSchema.safeParse(data);

  if (!newSafeSupplier.success) {
    return null;
  }

  const newSupplier = newSafeSupplier.data;

  await prisma.supplier.create({
    data: {
      address: newSupplier.address,
      contactName: newSupplier.contactName,
      name: newSupplier.name,
      phoneNumber: newSupplier.phoneNumber,
      storeId: currentStore.id,
    },
  });

  revalidatePath("/", "layout");
}
