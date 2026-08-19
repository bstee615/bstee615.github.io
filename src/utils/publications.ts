export const publicationVenueTypes = [
  "conference-paper",
  "workshop-paper",
  "preprint",
  "thesis",
  "dissertation",
  "poster",
  "course-project",
] as const;

export type PublicationVenueType = (typeof publicationVenueTypes)[number];

export const cvPublicationVenueTypes = new Set<PublicationVenueType>([
  "conference-paper",
  "workshop-paper",
  "preprint",
  "thesis",
  "dissertation",
  "poster",
]);

export const formatVenueWithYear = (venue: string, date: Date) =>
  `${venue} '${String(date.getUTCFullYear()).slice(-2)}`;
