export type Notification = {
  id: string;
  type: "update" | "advisory" | "alert" | "system";
  title: string;
  summary: string;
  date: string;
  link: string;
};

export const NOTIFICATIONS: Notification[] = [
  {
    id: "notif-1",
    type: "advisory",
    title: "Important Travel Advisory",
    summary: "New health and safety guidelines for international arrivals starting October.",
    date: "2026-09-02",
    link: "/advisories#health",
  },
  {
    id: "notif-2",
    type: "update",
    title: "Visa Processing Times",
    summary: "e-Tourist visa processing is currently operating within the standard 72-96 hours.",
    date: "2026-09-04",
    link: "/visa-information#processing",
  },
  {
    id: "notif-3",
    type: "system",
    title: "System Maintenance",
    summary: "The payment gateway will undergo scheduled maintenance this Sunday from 02:00 to 04:00 IST.",
    date: "2026-09-01",
    link: "/help#maintenance",
  },
  {
    id: "notif-4",
    type: "alert",
    title: "Beware of Fraudulent Websites",
    summary: "Government of India does not authorize agents to charge extra fees. Use only official portals.",
    date: "2026-08-28",
    link: "/advisories#fraud",
  },
];
