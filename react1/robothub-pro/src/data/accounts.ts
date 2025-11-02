export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

export type AccountOrder = {
  id: string;
  date: string;
  items: number;
  total: number;
  status: OrderStatus;
};

export type AccountProfile = {
  company?: string;
  phone?: string;
  location?: string;
  bio?: string;
};

export type AccountRecord = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  status: "active" | "banned";
  joinedAt: string;
  profile: AccountProfile;
  orders: AccountOrder[];
};

export const seedAccounts: AccountRecord[] = [
  {
    id: "admin-001",
    name: "Riley Chen",
    email: "admin@robothub.com",
    password: "admin123",
    role: "admin",
    status: "active",
    joinedAt: "2023-04-18",
    profile: {
      company: "RobotHub Ops",
      phone: "+1 (415) 555-0112",
      location: "San Francisco, USA",
      bio: "Runs revenue, inventory, and customer success for the RobotHub marketplace.",
    },
    orders: [],
  },
  {
    id: "user-241",
    name: "Amelia Stone",
    email: "amelia@builders.dev",
    password: "user123",
    role: "user",
    status: "active",
    joinedAt: "2024-02-09",
    profile: {
      company: "Forge Makerspace",
      phone: "+1 (917) 555-0198",
      location: "Brooklyn, USA",
      bio: "Leads the automation lab exploring mobile manipulation builds.",
    },
    orders: [
      { id: "ORD-4097", date: "2025-01-22", items: 6, total: 4820, status: "Delivered" },
      { id: "ORD-4182", date: "2025-02-14", items: 3, total: 2140, status: "Shipped" },
      { id: "ORD-4205", date: "2025-03-02", items: 5, total: 3625, status: "Processing" },
    ],
  },
];
