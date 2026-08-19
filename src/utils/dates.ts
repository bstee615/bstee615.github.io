const dateFormatters = {
  full: new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }),
  list: new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }),
  monthYear: new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }),
} as const;

export type DateFormat = keyof typeof dateFormatters;

export const formatDate = (date: Date, format: DateFormat) =>
  dateFormatters[format].format(date);

export const parseDateOnly = (date: string) => {
  const parsed = new Date(`${date}T00:00:00.000Z`);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    Number.isNaN(parsed.valueOf()) ||
    parsed.toISOString().slice(0, 10) !== date
  ) {
    throw new Error(`Invalid ISO date: ${date}`);
  }
  return parsed;
};
