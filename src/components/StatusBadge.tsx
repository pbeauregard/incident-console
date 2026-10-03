import type { IncidentStatus } from "../data/incidents";

export function StatusBadge({ status }: { status: IncidentStatus }) {
  return (
    <span
      className={`status status-${status.toLowerCase()}`}
    >
      {status}
    </span>
  );
}
