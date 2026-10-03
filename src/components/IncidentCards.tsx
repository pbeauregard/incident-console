import type { Incident } from "../data/incidents";
import { StatusBadge } from "./StatusBadge";

interface IncidentCardsProps {
  incidents: Incident[];
  onSelect: (id: string, trigger: HTMLButtonElement) => void;
}

export function IncidentCards({ incidents, onSelect }: IncidentCardsProps) {
  return (
    <div className="card-grid">
      {incidents.map((incident) => (
        <article
          className="incident-card"
          key={incident.id}
          aria-labelledby={`incident-${incident.id}-title`}
        >
          <div className="card-heading">
            <span>{incident.id}</span>
            <StatusBadge status={incident.status} />
          </div>
          <h3 id={`incident-${incident.id}-title`}>{incident.title}</h3>
          <p>{incident.location}</p>
          <p className="card-meta">
            {incident.type} at {incident.time}
          </p>
          <button
            type="button"
            aria-label={`View details for ${incident.id}: ${incident.title}`}
            onClick={(event) => onSelect(incident.id, event.currentTarget)}
          >
            View details
          </button>
        </article>
      ))}
    </div>
  );
}
