import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { IncidentTable } from "./IncidentTable";

describe("IncidentTable", () => {
  it("renders incidents in a table and triggers selection", () => {
    const onSelect = vi.fn();
    const incidents = [
      {
        id: "INC-301",
        title: "Access denied",
        type: "Door activity" as const,
        status: "Resolved" as const,
        location: "Server room",
        time: "11:15",
        description: "Badge access was denied for a restricted door.",
      },
    ];

    render(<IncidentTable incidents={incidents} onSelect={onSelect} />);

    expect(screen.getByText(/INC-301: Access denied/i)).toBeInTheDocument();
    expect(screen.getByText("Server room")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /INC-301: Access denied/i }));

    expect(onSelect).toHaveBeenCalledWith("INC-301");
  });
});
