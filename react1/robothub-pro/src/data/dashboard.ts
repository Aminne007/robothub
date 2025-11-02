export type MetricTrend = "up" | "down" | "steady";

export type OverviewMetric = {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: MetricTrend;
};

export const overviewMetrics: OverviewMetric[] = [
  {
    id: "revenue",
    label: "Revenue (30d)",
    value: "$128K",
    delta: "+12.4% vs last month",
    trend: "up",
  },
  {
    id: "orders",
    label: "Fulfilled orders",
    value: "864",
    delta: "+7.2% completion",
    trend: "up",
  },
  {
    id: "inventory",
    label: "Low-stock SKUs",
    value: "6",
    delta: "Needs restock",
    trend: "down",
  },
  {
    id: "tickets",
    label: "Support backlog",
    value: "18",
    delta: "Cleared daily",
    trend: "steady",
  },
];

export type SalesPipelineStage = {
  stage: string;
  value: number;
  quota: number;
};

export const salesPipeline: SalesPipelineStage[] = [
  { stage: "Discovery", value: 38, quota: 50 },
  { stage: "Prototyping", value: 24, quota: 30 },
  { stage: "Pilot", value: 16, quota: 18 },
  { stage: "Deployment", value: 9, quota: 12 },
];

export type OrderRow = {
  id: string;
  company: string;
  status: "Paid" | "Pending" | "Delayed";
  value: string;
  items: number;
  updatedAt: string;
};

export const recentOrders: OrderRow[] = [
  { id: "INV-1029", company: "Atlas Robotics Lab", status: "Paid", value: "$12,430", items: 18, updatedAt: "2h ago" },
  { id: "INV-1030", company: "Nexus Automation", status: "Pending", value: "$9,980", items: 12, updatedAt: "4h ago" },
  { id: "INV-1031", company: "Forge Makerspace", status: "Paid", value: "$4,210", items: 9, updatedAt: "Yesterday" },
  { id: "INV-1032", company: "Orbital Research", status: "Delayed", value: "$18,670", items: 26, updatedAt: "2d ago" },
];

export type Alert = {
  id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
};

export const alerts: Alert[] = [
  {
    id: "stock",
    title: "Battery packs below threshold",
    description: "3S LiPo inventory at 18% capacity. Supplier restock ETA Friday.",
    severity: "high",
  },
  {
    id: "ticket",
    title: "Escalated support ticket",
    description: "Vision kit firmware rollback requested by Delta Robotics.",
    severity: "medium",
  },
  {
    id: "shipment",
    title: "Customs paperwork required",
    description: "International order INV-1033 awaiting HS code confirmation.",
    severity: "low",
  },
];

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  focus: string;
  status: "Available" | "In build" | "Offline";
};

export const team: TeamMember[] = [
  { id: "tm-jordan", name: "Jordan Blake", role: "Head of Robotics Ops", focus: "Fulfillment", status: "Available" },
  { id: "tm-amira", name: "Amira Khan", role: "Lead Applications Engineer", focus: "Enterprise pilots", status: "In build" },
  { id: "tm-luis", name: "Luis Ortega", role: "Community Manager", focus: "Workshops", status: "Available" },
  { id: "tm-samia", name: "Samia Idris", role: "Supply Chain Analyst", focus: "Vendors", status: "Offline" },
];

export type ActivityLog = {
  id: string;
  title: string;
  actor: string;
  timestamp: string;
};

export const activityLog: ActivityLog[] = [
  { id: "ac-order", title: "Order INV-1034 packed", actor: "Warehouse 2", timestamp: "12 minutes ago" },
  { id: "ac-ticket", title: "Ticket #584 closed", actor: "Support Bot", timestamp: "32 minutes ago" },
  { id: "ac-guide", title: "New build guide published", actor: "Amira Khan", timestamp: "Today 09:14" },
  { id: "ac-recipe", title: "Added 6 new BOM recipes", actor: "Nexus Automation", timestamp: "Yesterday" },
];

export type BuilderProject = {
  id: string;
  name: string;
  stage: string;
  eta: string;
  health: "on-track" | "at-risk" | "blocked";
  collaborators: number;
};

export const builderProjects: BuilderProject[] = [
  { id: "proj-atlas", name: "Atlas quadruped", stage: "Firmware validation", eta: "Due in 6d", health: "at-risk", collaborators: 5 },
  { id: "proj-lumen", name: "Lumen warehouse AMR", stage: "Sensor integration", eta: "Due in 12d", health: "on-track", collaborators: 8 },
  { id: "proj-orbit", name: "Orbit inspection drone", stage: "Powertrain refit", eta: "Due in 3d", health: "blocked", collaborators: 4 },
];

export type QuickAction = {
  id: string;
  label: string;
  description: string;
  href: string;
};

export const quickActions: QuickAction[] = [
  { id: "create-bom", label: "Create build of materials", description: "Launch the guided workflow to assemble a shareable BOM.", href: "/catalog" },
  { id: "book-expert", label: "Book expert session", description: "Schedule an hour with a robotics specialist for your roadmap.", href: "/login" },
  { id: "launch-playbook", label: "Launch deployment playbook", description: "Download the latest rollout template for field pilots.", href: "#" },
];

export type LearningTrack = {
  id: string;
  title: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
};

export const learningTracks: LearningTrack[] = [
  { id: "lt-controllers", title: "Edge controllers for industrial robotics", duration: "3h self-paced", level: "Intermediate" },
  { id: "lt-vision", title: "Vision pipelines with ROS 2", duration: "6 live sessions", level: "Advanced" },
  { id: "lt-hardware", title: "Designing reliable power systems", duration: "2h hands-on", level: "Beginner" },
];

export type ResourceItem = {
  id: string;
  title: string;
  description: string;
  type: "Guide" | "Case study" | "Template";
};

export const resourceLibrary: ResourceItem[] = [
  {
    id: "res-field-kit",
    title: "Field service kit checklist",
    description: "Ensure every deployment van leaves with the calibrated tools it needs.",
    type: "Template",
  },
  {
    id: "res-lab",
    title: "Research lab onboarding playbook",
    description: "Bring new lab members up to speed with standardized build workflows.",
    type: "Guide",
  },
  {
    id: "res-warehouse",
    title: "Warehouse automation case study",
    description: "How Lumen scaled from pilot to 200+ AMRs with RobotHub Pro.",
    type: "Case study",
  },
];
