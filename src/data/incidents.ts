export type IncidentType = "Alarm" | "Door activity" | "Camera event";
export type IncidentStatus = "Active" | "Acknowledged" | "Resolved";
export type ViewMode = "List" | "Cards";

export interface Incident {
  id: string;
  title: string;
  type: IncidentType;
  status: IncidentStatus;
  location: string;
  time: string;
  description: string;
}

export const initialIncidents: Incident[] = [
  {
    id: "INC-101",
    title: "Forced door detected",
    type: "Door activity",
    status: "Active",
    location: "North entrance",
    time: "09:42",
    description: "The north entrance reported a forced-open state.",
  },
  {
    id: "INC-102",
    title: "Motion after hours",
    type: "Camera event",
    status: "Acknowledged",
    location: "Warehouse aisle 4",
    time: "09:36",
    description: "Motion was detected outside the configured operating window.",
  },
  {
    id: "INC-103",
    title: "Badge access denied",
    type: "Door activity",
    status: "Resolved",
    location: "Research lab",
    time: "09:28",
    description: "A credential was denied at the research lab reader.",
  },
  {
    id: "INC-104",
    title: "Perimeter alarm triggered",
    type: "Alarm",
    status: "Active",
    location: "West fence",
    time: "09:17",
    description: "A perimeter sensor entered its active alarm state.",
  },
  {
    id: "INC-105",
    title: "Camera signal restored",
    type: "Camera event",
    status: "Resolved",
    location: "Parking level 2",
    time: "09:03",
    description: "The camera resumed sending a healthy signal.",
  },
  {
    id: "INC-106",
    title: "Emergency exit opened",
    type: "Alarm",
    status: "Active",
    location: "South stairwell",
    time: "08:55",
    description: "The emergency exit opened while the area was secured.",
  },
];
