import { useEffect, useRef } from "react";
import type { Incident } from "../data/incidents";
import { StatusBadge } from "./StatusBadge";

interface IncidentDetailsPanelProps {
  incident: Incident;
  onClose: () => void;
  onAcknowledge: () => void;
}

export default function IncidentDetailsPanel({
  incident,
  onClose,
  onAcknowledge,
}: IncidentDetailsPanelProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <aside
      className="details-panel"
      aria-labelledby="incident-details-heading"
    >
      <div className="details-heading">
        <div>
          <p className="eyebrow">Incident details</p>
          <h2 id="incident-details-heading" ref={headingRef} tabIndex={-1}>
            {incident.id}
          </h2>
        </div>
        <button type="button" className="secondary" onClick={onClose}>
          Close details
        </button>
      </div>

      <StatusBadge status={incident.status} />
      <h3>{incident.title}</h3>
      <p>{incident.description}</p>

      <dl>
        <div>
          <dt>Type</dt>
          <dd>{incident.type}</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>{incident.location}</dd>
        </div>
        <div>
          <dt>Time</dt>
          <dd>{incident.time}</dd>
        </div>
      </dl>

      <button
        type="button"
        className="primary"
        disabled={incident.status !== "Active"}
        onClick={onAcknowledge}
      >
        {incident.status === "Active" ? "Acknowledge incident" : "No action required"}
      </button>
    </aside>
  );
}
