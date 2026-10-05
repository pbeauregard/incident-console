import "@testing-library/jest-dom/vitest";
import { beforeEach, vi } from "vitest";
import { initialIncidents } from "./data/incidents";

beforeEach(() => {
	vi.stubGlobal(
		"fetch",
		vi.fn<typeof fetch>(async (input) => {
			const path = String(input);
			const incident = initialIncidents.find((item) =>
				path.endsWith(`${item.id}/acknowledge`),
			);
			return {
				ok: true,
				json: async () =>
					incident ? { ...incident, status: "Acknowledged" } : initialIncidents,
			} as Response;
		}),
	);
});
