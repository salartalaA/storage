"use server";

import { revalidatePath } from "next/cache";
import { getCurrentStore } from "@/actions/auth";
import prisma from "@/lib/prisma";
import { type LocationData, locationSchema } from "@/schema/location";

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

export async function addStoreLocation(data: LocationData) {
  const currentStore = await getCurrentStore();

  if (!currentStore) {
    return null;
  }

  const newSafeLocation = locationSchema.safeParse(data);

  if (!newSafeLocation.success) {
    return null;
  }

  const newLocation = newSafeLocation.data;

  await prisma.location.create({
    data: {
      name: newLocation.name,
      storeId: currentStore.id,
    },
  });

  revalidatePath("/", "layout");
}

export async function deleteStoreLocation(locationId: string) {
  const currentStore = await getCurrentStore();

  if (!currentStore) {
    return null;
  }

  await prisma.location.delete({
    where: {
      id: locationId,
      storeId: currentStore.id,
    },
  });

  revalidatePath("/", "layout");
}

export async function updateStoreLocation(
  locationId: string,
  data: LocationData
) {
  const currentStore = await getCurrentStore();

  if (!currentStore) {
    return null;
  }

  const updatedSafeLocation = locationSchema.safeParse(data);

  if (!updatedSafeLocation.success) {
    return null;
  }

  const updatedLocation = updatedSafeLocation.data;

  await prisma.location.update({
    data: {
      name: updatedLocation.name,
    },
    where: {
      id: locationId,
      storeId: currentStore.id,
    },
  });

  revalidatePath("/", "layout");
}
