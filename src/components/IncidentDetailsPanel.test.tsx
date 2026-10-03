import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import IncidentDetailsPanel from "./IncidentDetailsPanel";

describe("IncidentDetailsPanel", () => {
  it("renders incident details and acknowledges an active incident", () => {
    const onClose = vi.fn();
    const onAcknowledge = vi.fn();

    render(
      <IncidentDetailsPanel
        incident={{
          id: "INC-401",
          title: "Motion alert",
          type: "Camera event",
          status: "Active",
          location: "Parking gate",
          time: "08:00",
          description: "Motion was detected at the parking gate.",
        }}
        onClose={onClose}
        onAcknowledge={onAcknowledge}
      />,
    );

    expect(screen.getByRole("heading", { name: "INC-401" })).toBeInTheDocument();
    expect(screen.getByText("Motion alert")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Acknowledge incident/i }));

    expect(onAcknowledge).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: /Close details/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
