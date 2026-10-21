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

export async function getStoreSupplierOptions() {
  const currentStore = await getCurrentStore();

  if (!currentStore) {
    return [];
  }

  return prisma.supplier.findMany({
    orderBy: {
      name: "asc",
    },
    select: {
      id: true,
      name: true,
    },
    where: {
      storeId: currentStore.id,
    },
  });
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

export async function deleteStoreSupplier(supplierId: string) {
  const currentStore = await getCurrentStore();

  if (!currentStore) {
    return null;
  }

  const existingSupplier = await prisma.supplier.findUnique({
    where: {
      id: supplierId,
      storeId: currentStore.id,
    },
  });

  if (!existingSupplier) {
    return null;
  }

  await prisma.supplier.delete({
    where: {
      id: supplierId,
      storeId: currentStore.id,
    },
  });

  revalidatePath("/", "layout");
}

export async function updateStoreSupplier(
  supplierId: string,
  data: SupplierData
) {
  const currentStore = await getCurrentStore();

  if (!currentStore) {
    return null;
  }

  const updatedSafeSupplier = supplierSchema.safeParse(data);

  if (!updatedSafeSupplier.success) {
    return null;
  }

  const updatedSupplier = updatedSafeSupplier.data;

  const existingSupplier = await prisma.supplier.findUnique({
    where: {
      id: supplierId,
      storeId: currentStore.id,
    },
  });

  if (!existingSupplier) {
    return null;
  }

  await prisma.supplier.update({
    data: {
      address: updatedSupplier.address,
      contactName: updatedSupplier.contactName,
      name: updatedSupplier.name,
      phoneNumber: updatedSupplier.phoneNumber,
    },
    where: {
      id: supplierId,
      storeId: currentStore.id,
    },
  });

  revalidatePath("/", "layout");
}
