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

    const incidentButton = await screen.findByRole("button", {
      name: /INC-101: Forced door detected/i,
    });
    fireEvent.click(incidentButton);

    const detailsHeading = await screen.findByRole("heading", { name: "INC-101" });
    expect(detailsHeading).toBeInTheDocument();
    await waitFor(() => expect(detailsHeading).toHaveFocus());
    expect(screen.getByText("Forced door detected")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Close details/i }));
    await waitFor(() => expect(incidentButton).toHaveFocus());
  });
});
