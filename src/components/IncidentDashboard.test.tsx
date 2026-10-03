import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import IncidentDashboard from "./IncidentDashboard";

describe("IncidentDashboard", () => {
  it("renders the dashboard and updates filtered counts", async () => {
    render(<IncidentDashboard />);

    expect(
      await screen.findByRole("heading", { name: "Security incident console" }),
    ).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Status"), {
      target: { value: "Resolved" },
    });

    await waitFor(() => {
      expect(screen.getByText("2 shown")).toBeInTheDocument();
    });
  });

  it("opens the details pane for a selected incident", async () => {
    render(<IncidentDashboard />);

    fireEvent.click(
      await screen.findByRole("button", { name: /INC-101: Forced door detected/i }),
    );

    expect(await screen.findByRole("heading", { name: "INC-101" })).toBeInTheDocument();
    expect(screen.getByText("Forced door detected")).toBeInTheDocument();
  });
});
