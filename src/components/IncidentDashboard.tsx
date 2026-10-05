import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import {
  type Incident,
  type IncidentStatus,
  type IncidentType,
  type ViewMode,
} from "../data/incidents";
import {
  acknowledgeIncident as saveAcknowledgement,
  getIncidents,
} from "../data/incidentsApi";
import { IncidentCards } from "./IncidentCards";
import { IncidentTable } from "./IncidentTable";

const IncidentDetailsPanel = lazy(() => import("./IncidentDetailsPanel"));

export default function IncidentDashboard() {
  const incidentTriggerRef = useRef<HTMLButtonElement | null>(null);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<"All" | IncidentType>("All");
  const [statusFilter, setStatusFilter] = useState<"All" | IncidentStatus>(
    "All",
  );
  const [viewMode, setViewMode] = useState<ViewMode>("List");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    getIncidents()
      .then((loadedIncidents) => {
        if (isMounted) setIncidents(loadedIncidents);
      })
      .catch(() => {
        if (isMounted) setError("Unable to load incidents. Check the API connection and try again.");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredIncidents = useMemo(
    () =>
      incidents.filter(
        (incident) =>
          (typeFilter === "All" || incident.type === typeFilter) &&
          (statusFilter === "All" || incident.status === statusFilter),
      ),
    [incidents, statusFilter, typeFilter],
  );

  const activeCount = incidents.filter(
    (incident) => incident.status === "Active",
  ).length;

  const selectedIncident =
    incidents.find((incident) => incident.id === selectedId) ?? null;

  useEffect(() => {
    if (!selectedIncident) incidentTriggerRef.current?.focus();
  }, [selectedIncident]);

  function selectIncident(id: string, trigger: HTMLButtonElement) {
    incidentTriggerRef.current = trigger;
    setSelectedId(id);
  }

  async function acknowledgeSelected() {
    if (!selectedIncident || selectedIncident.status !== "Active") return;

    try {
      const updatedIncident = await saveAcknowledgement(selectedIncident.id);
      setIncidents((current) =>
        current.map((incident) =>
          incident.id === updatedIncident.id ? updatedIncident : incident,
        ),
      );
      setError(null);
    } catch {
      setError("Unable to acknowledge this incident. Try again.");
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Operations workspace</p>
          <h1>Security incident console</h1>
        </div>
        <div className="metric" role="status" aria-live="polite" aria-atomic="true">
          <span>{activeCount}</span>
          <span>active incidents</span>
        </div>
      </header>

      <main>
        <section className="filters" aria-label="Report controls">
          <label>
            Type
            <select
              value={typeFilter}
              onChange={(event) =>
                setTypeFilter(event.currentTarget.value as "All" | IncidentType)
              }
            >
              <option value="All">All types</option>
              <option value="Alarm">Alarm</option>
              <option value="Door activity">Door activity</option>
              <option value="Camera event">Camera event</option>
            </select>
          </label>

          <label>
            Status
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.currentTarget.value as "All" | IncidentStatus,
                )
              }
            >
              <option value="All">All statuses</option>
              <option value="Active">Active</option>
              <option value="Acknowledged">Acknowledged</option>
              <option value="Resolved">Resolved</option>
            </select>
          </label>

          <label>
            View
            <select
              value={viewMode}
              onChange={(event) =>
                setViewMode(event.currentTarget.value as ViewMode)
              }
            >
              <option value="List">List</option>
              <option value="Cards">Cards</option>
            </select>
          </label>
        </section>

        <div className={`workspace${selectedIncident ? " has-details" : ""}`}>
          <section className="results" aria-labelledby="incidents-heading">
            <div className="results-heading">
              <div>
                <p className="eyebrow">Current report</p>
                <h2 id="incidents-heading">Incidents</h2>
              </div>
              <p role="status" aria-live="polite" aria-atomic="true">
                {filteredIncidents.length} shown
              </p>
            </div>

            {isLoading ? (
              <div className="empty-state" role="status">Loading incidents…</div>
            ) : error && incidents.length === 0 ? (
              <div className="empty-state" role="alert">{error}</div>
            ) : filteredIncidents.length === 0 ? (
              <div className="empty-state" role="status">
                <h3>No incidents match</h3>
                <p>Change one of the report filters to restore results.</p>
              </div>
            ) : viewMode === "List" ? (
              <IncidentTable
                incidents={filteredIncidents}
                onSelect={selectIncident}
              />
            ) : (
              <IncidentCards
                incidents={filteredIncidents}
                onSelect={selectIncident}
              />
            )}

            {error && incidents.length > 0 && <p role="alert">{error}</p>}
          </section>

          {selectedIncident && (
            <Suspense
              fallback={
                <aside
                  className="details-panel"
                  role="status"
                  aria-live="polite"
                >
                  Loading details…
                </aside>
              }
            >
              <IncidentDetailsPanel
                incident={selectedIncident}
                onClose={() => setSelectedId(null)}
                onAcknowledge={acknowledgeSelected}
              />
            </Suspense>
          )}
        </div>
      </main>
    </div>
  );
}
