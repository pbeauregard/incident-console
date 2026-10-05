import type { Incident } from "./incidents";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, init);
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.json() as Promise<T>;
}

export function getIncidents(): Promise<Incident[]> {
  return request<Incident[]>("/api/incidents");
}

export function acknowledgeIncident(id: string): Promise<Incident> {
  return request<Incident>(`/api/incidents/${encodeURIComponent(id)}/acknowledge`, {
    method: "PATCH",
  });
}