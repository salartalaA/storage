// import { getCurrentStore } from "@/actions/auth";
// import prisma from "@/lib/prisma";

// interface DashboardStats {
//   activeProductCount: number;
//   expiringInventoryCount: number;
//   outOfStockProductCount: number;
//   totalQuantity: number;
// }

// export async function getDashboardStats(): Promise<DashboardStats | null> {
//   const currentStore = await getCurrentStore();

//   if (!currentStore) {
//     return null;
//   }

//   const now = new Date();
//   const startOfToday = new Date(now);
//   startOfToday.setHours(0, 0, 0, 0);

//   const startOfDayAfterSevenDays = new Date(startOfToday);
//   startOfDayAfterSevenDays.setDate(startOfDayAfterSevenDays.getDate() + 8);

//   const [products, expiringInventoryCount] = await Promise.all([
//     prisma.product.findMany({
//       select: {
//         inventories: {
//           select: {
//             quantity: true,
//           },
//           where: {
//             isActive: true,
//           },
//         },
//       },
//       where: {
//         isActive: true,
//         storeId: currentStore.id,
//       },
//     }),

//     prisma.inventory.count({
//       where: {
//         expirationDate: {
//           gte: startOfToday,
//           lt: startOfDayAfterSevenDays,
//         },
//         isActive: true,
//         product: {
//           isActive: true,
//           storeId: currentStore.id,
//         },
//         quantity: {
//           gt: 0,
//         },
//       },
//     }),
//   ]);

//   let totalQuantity = 0;
//   let outOfStockProductCount = 0;

//   for (const product of products) {
//     const productQuantity = product.inventories.reduce(
//       (total, inventory) => total + inventory.quantity,
//       0
//     );

//     totalQuantity += productQuantity;

//     if (productQuantity === 0) {
//       // biome-ignore lint/style/noIncrementDecrement: Intentional
//       outOfStockProductCount++;
//     }
//   }

//   return {
//     activeProductCount: products.length,
//     expiringInventoryCount,
//     outOfStockProductCount,
//     totalQuantity,
//   };
// }

import { getCurrentStore } from "@/actions/auth";
import prisma from "@/lib/prisma";

export interface DashboardStats {
  activeProductCount: number;
  expiringInventoryCount: number;
  outOfStockProductCount: number;
  stockStatus: {
    inStock: number;
    outOfStock: number;
    closeToExpire: number;
    totalProducts: number;
  };
  totalQuantity: number;
}

export async function getDashboardStats(): Promise<DashboardStats | null> {
  const currentStore = await getCurrentStore();

  if (!currentStore) {
    return null;
  }

  const now = new Date();
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const startOfDayAfterSevenDays = new Date(startOfToday);
  startOfDayAfterSevenDays.setDate(startOfDayAfterSevenDays.getDate() + 8);

  const products = await prisma.product.findMany({
    select: {
      inventories: {
        select: {
          expirationDate: true,
          quantity: true,
        },
        where: {
          isActive: true,
        },
      },
    },
    where: {
      isActive: true,
      storeId: currentStore.id,
    },
  });

  let totalQuantity = 0;
  let outOfStockProductCount = 0;
  let inStock = 0;
  let closeToExpire = 0;

  for (const product of products) {
    let productQuantity = 0;
    let hasExpiringInventory = false;

    for (const inventory of product.inventories) {
      productQuantity += inventory.quantity;

      if (
        inventory.quantity > 0 &&
        inventory.expirationDate !== null &&
        inventory.expirationDate >= startOfToday &&
        inventory.expirationDate < startOfDayAfterSevenDays
      ) {
        hasExpiringInventory = true;
      }
    }

    totalQuantity += productQuantity;

    if (productQuantity <= 0) {
      // biome-ignore lint/style/noIncrementDecrement: Intentional
      outOfStockProductCount++;
    } else if (hasExpiringInventory) {
      // biome-ignore lint/style/noIncrementDecrement: Intentional
      closeToExpire++;
    } else {
      // biome-ignore lint/style/noIncrementDecrement: Intentional
      inStock++;
    }
  }

  const expiringInventoryCount = await prisma.inventory.count({
    where: {
      expirationDate: {
        gte: startOfToday,
        lt: startOfDayAfterSevenDays,
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

  return {
    activeProductCount: products.length,
    expiringInventoryCount,
    outOfStockProductCount,
    stockStatus: {
      closeToExpire,
      inStock,
      outOfStock: outOfStockProductCount,
      totalProducts: products.length,
    },
    totalQuantity,
  };
}
