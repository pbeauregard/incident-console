import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { IncidentCards } from "./IncidentCards";

describe("IncidentCards", () => {
  it("renders cards and calls onSelect when a card is clicked", () => {
    const onSelect = vi.fn();
    const incidents = [
      {
        id: "INC-201",
        title: "Door opened",
        type: "Door activity" as const,
        status: "Active" as const,
        location: "North entrance",
        time: "10:00",
        description: "A door opened without an expected badge event.",
      },
    ];

    render(<IncidentCards incidents={incidents} onSelect={onSelect} />);

    expect(
      screen.getByRole("article", { name: "Door opened" }),
    ).toBeInTheDocument();
    expect(screen.getByText("INC-201")).toBeInTheDocument();
    expect(screen.getByText("Door opened")).toBeInTheDocument();

    const detailsButton = screen.getByRole("button", {
      name: "View details for INC-201: Door opened",
    });
    fireEvent.click(detailsButton);

    expect(onSelect).toHaveBeenCalledWith("INC-201", detailsButton);
  });
});
