import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { initialIncidents } from "./data/incidents";
import App from "./App";

describe("App", () => {
  it("renders the dashboard and filters incidents by status", async () => {
    render(<App />);

    expect(
      await screen.findByRole("heading", { name: "Security incident console" }),
    ).toBeInTheDocument();

    fireEvent.change(await screen.findByLabelText("Status"), {
      target: { value: "Resolved" },
    });

    await waitFor(() => {
      const resolvedCount = initialIncidents.filter(
        (incident) => incident.status === "Resolved",
      ).length;
      expect(screen.getByText(`${resolvedCount} shown`)).toBeInTheDocument();
    });
  });

  it("opens incident details and acknowledges an active incident", async () => {
    render(<App />);

    fireEvent.click(
      await screen.findByRole("button", {
        name: /INC-101: Forced door detected/i,
      }),
    );

    expect(await screen.findByRole("heading", { name: "INC-101" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Acknowledge incident/i }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /No action required/i })).toBeInTheDocument();
    });
  });
});
