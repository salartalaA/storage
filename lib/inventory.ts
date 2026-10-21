export interface ExpirableInventory {
  expirationDateTimestamp: number | null;
  isActive: boolean;
}

export function compareInventoryExpiration(
  first: Pick<ExpirableInventory, "expirationDateTimestamp">,
  second: Pick<ExpirableInventory, "expirationDateTimestamp">
) {
  if (
    first.expirationDateTimestamp === null &&
    second.expirationDateTimestamp === null
  ) {
    return 0;
  }

  if (first.expirationDateTimestamp === null) {
    return 1;
  }

  if (second.expirationDateTimestamp === null) {
    return -1;
  }

  return first.expirationDateTimestamp - second.expirationDateTimestamp;
}

export function sortInventoriesByPriority<T extends ExpirableInventory>(
  inventories: T[]
) {
  return [...inventories].sort((first, second) => {
    if (first.isActive !== second.isActive) {
      return first.isActive ? -1 : 1;
    }

    return compareInventoryExpiration(first, second);
  });
}

export function getPriorityInventory<T extends ExpirableInventory>(
  inventories: T[]
) {
  let priorityInventory: T | undefined;

  for (const inventory of inventories) {
    if (!inventory.isActive || inventory.expirationDateTimestamp === null) {
      continue;
    }

    if (
      !priorityInventory ||
      compareInventoryExpiration(inventory, priorityInventory) < 0
    ) {
      priorityInventory = inventory;
    }
  }

  return priorityInventory;
}

export function getNearestExpirationInventory<T extends ExpirableInventory>(
  inventories: T[]
) {
  let nearestInventory: T | undefined;

  for (const inventory of inventories) {
    if (inventory.expirationDateTimestamp === null) {
      continue;
    }

    if (
      !nearestInventory ||
      compareInventoryExpiration(inventory, nearestInventory) < 0
    ) {
      nearestInventory = inventory;
    }
  }

  return nearestInventory;
}
