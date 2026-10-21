export function formatPersianDate(date: Date | null | undefined) {
  if (!date) {
    return "—";
  }

  return new Intl.DateTimeFormat("fa-IR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export function parseDateInput(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  const parsed = new Date(trimmed);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
}

export function formatRelativeTime(date: Date | string) {
  const value = typeof date === "string" ? new Date(date) : date;

  if (Number.isNaN(value.getTime())) {
    return "—";
  }

  const diffInMinutes = Math.floor((Date.now() - value.getTime()) / 60_000);

  if (diffInMinutes < 1) {
    return "همین حالا";
  }

  if (diffInMinutes < 60) {
    return `${diffInMinutes.toLocaleString("fa-IR")} دقیقه پیش`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `${diffInHours.toLocaleString("fa-IR")} ساعت پیش`;
  }

  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays < 30) {
    return `${diffInDays.toLocaleString("fa-IR")} روز پیش`;
  }

  return formatPersianDate(value);
}
