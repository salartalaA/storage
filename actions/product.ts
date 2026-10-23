"use server";

import { revalidatePath } from "next/cache";
import { getCurrentStore } from "@/actions/auth";
import { parseDateInput } from "@/lib/date";
import prisma from "@/lib/prisma";
import {
  type ProductData,
  type ProductDetailsData,
  type ProductInventoryChanges,
  productDetailsSchema,
  productInventoryChangesSchema,
  productSchema,
} from "@/schema/product";

export async function getStoreProducts() {
  const currentStore = await getCurrentStore();

  if (!currentStore) {
    return null;
  }

  const currentStoreProducts = await prisma.product.findMany({
    include: {
      inventories: {
        include: {
          location: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      supplier: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    where: {
      storeId: currentStore.id,
    },
  });

  return currentStoreProducts;
}

export type AddStoreProductResult =
  | {
      success: true;
    }
  | {
      error:
        | "UNAUTHORIZED"
        | "INVALID_DATA"
        | "BARCODE_ALREADY_EXISTS"
        | "INVALID_LOCATION"
        | "INVALID_SUPPLIER";
      success: false;
    };

export async function addStoreProduct(
  data: ProductData
): Promise<AddStoreProductResult> {
  const currentStore = await getCurrentStore();

  if (!currentStore) {
    return {
      error: "UNAUTHORIZED" as const,
      success: false,
    };
  }

  const safeProduct = productSchema.safeParse(data);

  if (!safeProduct.success) {
    return {
      error: "INVALID_DATA" as const,
      success: false,
    };
  }

  const newProduct = safeProduct.data;

  const locationIds = [
    ...new Set(newProduct.inventories.map((inventory) => inventory.locationId)),
  ];

  const [duplicateProduct, supplier, validLocations] = await Promise.all([
    prisma.product.findFirst({
      select: {
        id: true,
      },
      where: {
        barcode: newProduct.barcode,
        storeId: currentStore.id,
      },
    }),
    prisma.supplier.findFirst({
      select: {
        id: true,
      },
      where: {
        id: newProduct.supplierId,
        storeId: currentStore.id,
      },
    }),
    prisma.location.findMany({
      select: {
        id: true,
      },
      where: {
        id: {
          in: locationIds,
        },
        storeId: currentStore.id,
      },
    }),
  ]);

  if (duplicateProduct) {
    return {
      error: "BARCODE_ALREADY_EXISTS" as const,
      success: false,
    };
  }

  if (!supplier) {
    return {
      error: "INVALID_SUPPLIER" as const,
      success: false,
    };
  }

  if (validLocations.length !== locationIds.length) {
    return {
      error: "INVALID_LOCATION" as const,
      success: false,
    };
  }

  await prisma.$transaction(async (tx) => {
    const product = await tx.product.create({
      data: {
        barcode: newProduct.barcode,
        category: newProduct.category,
        image: newProduct.image || null,
        inventories:
          newProduct.inventories.length > 0
            ? {
                create: newProduct.inventories.map((inventory) => ({
                  expirationDate: parseDateInput(inventory.expirationDate),
                  locationId: inventory.locationId,
                  productionDate: parseDateInput(inventory.productionDate),
                  quantity: Number(inventory.quantity),
                  unitPrice: Number(inventory.unitPrice || 0),
                })),
              }
            : undefined,
        storeId: currentStore.id,
        supplierId: supplier.id,
        title: newProduct.title,
        unit: newProduct.unit,
      },
    });

    await tx.auditLog.create({
      data: {
        action: "PRODUCT_CREATE",
        details: `${newProduct.inventories.length} لوکیشن`,
        productId: product.id,
        productTitle: product.title,
        reason: newProduct.reason,
        storeId: currentStore.id,
      },
    });
  });

  revalidatePath("/", "layout");

  return {
    success: true,
  };
}

export type UpdateStoreProductResult =
  | {
      success: true;
    }
  | {
      error:
        | "UNAUTHORIZED"
        | "INVALID_DATA"
        | "NOT_FOUND"
        | "BARCODE_ALREADY_EXISTS"
        | "INVALID_SUPPLIER"
        | "INVALID_LOCATION";
      success: false;
    };

export async function updateStoreProduct(
  productId: string,
  data: ProductDetailsData,
  changes: ProductInventoryChanges
): Promise<UpdateStoreProductResult> {
  const currentStore = await getCurrentStore();

  if (!currentStore) {
    return {
      error: "UNAUTHORIZED" as const,
      success: false,
    };
  }

  const safeProduct = productDetailsSchema.safeParse(data);
  const safeChanges = productInventoryChangesSchema.safeParse(changes);

  if (!(safeProduct.success && safeChanges.success)) {
    return {
      error: "INVALID_DATA" as const,
      success: false,
    };
  }

  const updatedProduct = safeProduct.data;
  const { inventoryStates, newInventories, removedInventoryIds } =
    safeChanges.data;

  const [existingProduct, duplicateProduct, supplier] = await Promise.all([
    prisma.product.findFirst({
      select: {
        id: true,
        inventories: {
          select: {
            id: true,
            locationId: true,
          },
        },
      },
      where: {
        id: productId,
        storeId: currentStore.id,
      },
    }),
    prisma.product.findFirst({
      select: {
        id: true,
      },
      where: {
        barcode: updatedProduct.barcode,
        id: {
          not: productId,
        },
        storeId: currentStore.id,
      },
    }),
    prisma.supplier.findFirst({
      select: {
        id: true,
      },
      where: {
        id: updatedProduct.supplierId,
        storeId: currentStore.id,
      },
    }),
  ]);

  if (!existingProduct) {
    return {
      error: "NOT_FOUND" as const,
      success: false,
    };
  }

  if (duplicateProduct) {
    return {
      error: "BARCODE_ALREADY_EXISTS" as const,
      success: false,
    };
  }

  if (!supplier) {
    return {
      error: "INVALID_SUPPLIER" as const,
      success: false,
    };
  }

  const productInventoryIds = new Set(
    existingProduct.inventories.map((inventory) => inventory.id)
  );
  const removedIds = new Set(removedInventoryIds);

  if (
    [...removedIds].some((inventoryId) => !productInventoryIds.has(inventoryId))
  ) {
    return {
      error: "INVALID_DATA" as const,
      success: false,
    };
  }

  if (
    inventoryStates.some(
      (inventoryState) =>
        !productInventoryIds.has(inventoryState.id) ||
        removedIds.has(inventoryState.id)
    )
  ) {
    return {
      error: "INVALID_DATA" as const,
      success: false,
    };
  }

  const remainingLocationIds = new Set(
    existingProduct.inventories
      .filter((inventory) => !removedIds.has(inventory.id))
      .map((inventory) => inventory.locationId)
  );
  const newLocationIds = newInventories.map(
    (inventory) => inventory.locationId
  );

  if (
    new Set(newLocationIds).size !== newLocationIds.length ||
    newLocationIds.some((locationId) => remainingLocationIds.has(locationId))
  ) {
    return {
      error: "INVALID_LOCATION" as const,
      success: false,
    };
  }

  const validLocations = await prisma.location.findMany({
    select: {
      id: true,
    },
    where: {
      id: {
        in: [...new Set(newLocationIds)],
      },
      storeId: currentStore.id,
    },
  });

  if (validLocations.length !== new Set(newLocationIds).size) {
    return {
      error: "INVALID_LOCATION" as const,
      success: false,
    };
  }

  const inventoryDetails = [
    newInventories.length > 0 ? `افزودن ${newInventories.length} لوکیشن` : null,
    removedInventoryIds.length > 0
      ? `حذف ${removedInventoryIds.length} لوکیشن`
      : null,
  ]
    .filter(Boolean)
    .join(" • ");

  await prisma.$transaction(async (tx) => {
    await tx.product.update({
      data: {
        barcode: updatedProduct.barcode,
        category: updatedProduct.category,
        image: updatedProduct.image || null,
        supplierId: supplier.id,
        title: updatedProduct.title,
        unit: updatedProduct.unit,
      },
      where: {
        id: existingProduct.id,
      },
    });

    await Promise.all(
      inventoryStates.map((inventoryState) =>
        tx.inventory.update({
          data: {
            isActive: inventoryState.isActive,
          },
          where: {
            id: inventoryState.id,
          },
        })
      )
    );

    if (removedInventoryIds.length > 0) {
      await tx.inventory.deleteMany({
        where: {
          id: {
            in: removedInventoryIds,
          },
          productId: existingProduct.id,
        },
      });
    }

    if (newInventories.length > 0) {
      await tx.inventory.createMany({
        data: newInventories.map((inventory) => ({
          expirationDate: parseDateInput(inventory.expirationDate),
          locationId: inventory.locationId,
          productId: existingProduct.id,
          productionDate: parseDateInput(inventory.productionDate),
          quantity: Number(inventory.quantity),
          unitPrice: Number(inventory.unitPrice || 0),
        })),
      });
    }

    await tx.auditLog.create({
      data: {
        action: "PRODUCT_UPDATE",
        details: inventoryDetails || "ویرایش مشخصات محصول",
        productId: existingProduct.id,
        productTitle: updatedProduct.title,
        reason: "ویرایش محصول",
        storeId: currentStore.id,
      },
    });
  });

  revalidatePath("/", "layout");

  return {
    success: true,
  };
}

export type DeleteStoreProductResult =
  | {
      success: true;
    }
  | {
      error: "UNAUTHORIZED" | "NOT_FOUND";
      success: false;
    };

export async function deleteStoreProduct(
  productId: string
): Promise<DeleteStoreProductResult> {
  const currentStore = await getCurrentStore();

  if (!currentStore) {
    return {
      error: "UNAUTHORIZED",
      success: false,
    };
  }

  const existingProduct = await prisma.product.findFirst({
    select: {
      id: true,
      title: true,
    },
    where: {
      id: productId,
      storeId: currentStore.id,
    },
  });

  if (!existingProduct) {
    return {
      error: "NOT_FOUND",
      success: false,
    };
  }

  await prisma.$transaction(async (tx) => {
    await tx.product.delete({
      where: {
        id: existingProduct.id,
      },
    });

    await tx.auditLog.create({
      data: {
        action: "PRODUCT_DELETE",
        details: "حذف محصول و موجودی‌های آن",
        productId: existingProduct.id,
        productTitle: existingProduct.title,
        reason: "حذف محصول",
        storeId: currentStore.id,
      },
    });
  });

  revalidatePath("/", "layout");

  return {
    success: true,
  };
}

export type SetStoreProductActiveResult =
  | {
      success: true;
    }
  | {
      error: "UNAUTHORIZED" | "INVALID_DATA" | "NOT_FOUND";
      success: false;
    };

export async function setStoreProductActive(
  productId: string,
  isActive: boolean,
  reason = ""
): Promise<SetStoreProductActiveResult> {
  const currentStore = await getCurrentStore();

  if (!currentStore) {
    return {
      error: "UNAUTHORIZED",
      success: false,
    };
  }

  if (typeof isActive !== "boolean") {
    return {
      error: "INVALID_DATA",
      success: false,
    };
  }

  const trimmedReason = reason.trim();

  if (!(isActive || trimmedReason)) {
    return {
      error: "INVALID_DATA",
      success: false,
    };
  }

  const existingProduct = await prisma.product.findFirst({
    select: {
      id: true,
      title: true,
    },
    where: {
      id: productId,
      storeId: currentStore.id,
    },
  });

  if (!existingProduct) {
    return {
      error: "NOT_FOUND",
      success: false,
    };
  }

  await prisma.$transaction(async (tx) => {
    await tx.product.update({
      data: {
        isActive,
      },
      where: {
        id: existingProduct.id,
      },
    });

    await tx.auditLog.create({
      data: {
        action: isActive ? "PRODUCT_ENABLE" : "PRODUCT_DISABLE",
        details: isActive ? "فعال‌سازی مجدد محصول" : "غیرفعال‌سازی کل محصول",
        productId: existingProduct.id,
        productTitle: existingProduct.title,
        reason: isActive ? trimmedReason || "فعال‌سازی محصول" : trimmedReason,
        storeId: currentStore.id,
      },
    });
  });

  revalidatePath("/", "layout");

  return {
    success: true,
  };
}

export type ManageInventoryResult =
  | {
      success: true;
    }
  | {
      error:
        | "UNAUTHORIZED"
        | "INVALID_AMOUNT"
        | "INVALID_DATA"
        | "NOT_FOUND"
        | "INSUFFICIENT_STOCK";
      success: false;
    };

export async function adjustStoreInventory(
  inventoryId: string,
  amount: number,
  direction: "increase" | "decrease",
  reason: string
): Promise<ManageInventoryResult> {
  const currentStore = await getCurrentStore();

  if (!currentStore) {
    return {
      error: "UNAUTHORIZED",
      success: false,
    };
  }

  if (!Number.isInteger(amount) || amount <= 0) {
    return {
      error: "INVALID_AMOUNT",
      success: false,
    };
  }

  const trimmedReason = reason.trim();

  if (!trimmedReason) {
    return {
      error: "INVALID_DATA",
      success: false,
    };
  }

  const existingInventory = await prisma.inventory.findFirst({
    include: {
      product: {
        select: {
          title: true,
          unit: true,
        },
      },
    },
    where: {
      id: inventoryId,
      isActive: true,
      product: {
        storeId: currentStore.id,
      },
    },
  });

  if (!existingInventory) {
    return {
      error: "NOT_FOUND",
      success: false,
    };
  }

  if (direction === "decrease" && amount > existingInventory.quantity) {
    return {
      error: "INSUFFICIENT_STOCK",
      success: false,
    };
  }

  const delta = direction === "increase" ? amount : -amount;

  await prisma.$transaction(async (tx) => {
    await tx.inventory.update({
      data: {
        quantity: existingInventory.quantity + delta,
      },
      where: {
        id: existingInventory.id,
      },
    });

    await tx.auditLog.create({
      data: {
        action:
          direction === "increase"
            ? "INVENTORY_INCREASE"
            : "INVENTORY_DECREASE",
        details: `${amount} ${existingInventory.product.unit}`,
        productId: existingInventory.productId,
        productTitle: existingInventory.product.title,
        reason: trimmedReason,
        storeId: currentStore.id,
      },
    });
  });

  revalidatePath("/", "layout");

  return {
    success: true,
  };
}

export async function getInventories() {
  const currentStore = await getCurrentStore();

  if (!currentStore) {
    return null;
  }

  const categoryData = await prisma.inventory.findMany({
    select: {
      product: {
        select: {
          category: true,
        },
      },
      quantity: true,
      unitPrice: true,
    },

    where: {
      isActive: true,
      product: {
        isActive: true,
        storeId: currentStore.id,
      },
    },
  });

  return categoryData;
}

export async function getExpiringInventories() {
  const currentStore = await getCurrentStore();

  if (!currentStore) {
    return null;
  }

  return prisma.inventory.findMany({
    orderBy: {
      expirationDate: "asc",
    },

    select: {
      expirationDate: true,
      id: true,
      isActive: true,
      product: {
        select: {
          title: true,
          unit: true,
        },
      },
      quantity: true,
    },

    where: {
      expirationDate: {
        not: null,
      },

      isActive: true,

      product: {
        isActive: true,
        storeId: currentStore.id,
      },

      quantity: {
        gt: 0,
      },
    },
  });
}
