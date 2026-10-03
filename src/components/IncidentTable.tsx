import type { Incident } from "../data/incidents";
import { StatusBadge } from "./StatusBadge";

interface IncidentTableProps {
  incidents: Incident[];
  onSelect: (id: string) => void;
}

export function IncidentTable({ incidents, onSelect }: IncidentTableProps) {
  return (
    <div className="table-wrap">
      <table>
        <caption>Security incidents matching the current filters</caption>
        <thead>
          <tr>
            <th scope="col">Incident</th>
            <th scope="col">Type</th>
            <th scope="col">Location</th>
            <th scope="col">Time</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident) => (
            <tr key={incident.id}>
              <td>
                <button
                  type="button"
                  className="link-button"
                  onClick={() => onSelect(incident.id)}
                >
                  {incident.id}: {incident.title}
                </button>
              </td>
              <td>{incident.type}</td>
              <td>{incident.location}</td>
              <td>{incident.time}</td>
              <td>
                <StatusBadge status={incident.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
