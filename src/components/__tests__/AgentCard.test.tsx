import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AgentCard from "../AgentCard";
import { useAgentStore } from "@/store/agentStore";

vi.mock("@/store/agentStore", () => ({
  useAgentStore: vi.fn(),
}));

vi.mock("@/lib/toast", () => ({
  showToast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("AgentCard", () => {
  const mockUpdateStatus = vi.fn();

  beforeEach(() => {
    vi.mocked(useAgentStore).mockImplementation((selector) =>
      selector({
        updateAgentStatus: mockUpdateStatus,
      } as any),
    );
  });

  it("renders with default props", () => {
    render(<AgentCard id="1" />);
    expect(screen.getByText("Agent Smith")).toBeInTheDocument();
  });

  it("shows correct status", () => {
    render(<AgentCard id="1" status="running" />);
    expect(screen.getByText("running")).toBeInTheDocument();
  });

  it("displays metrics correctly", () => {
    render(
      <AgentCard
        id="1"
        memoryUsage={50}
        cpuUsage={30}
        taskProgress={75}
        currentTask="Test task"
      />,
    );
    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.getByText("30%")).toBeInTheDocument();
    expect(screen.getByText("Test task")).toBeInTheDocument();
  });

  it("handles status change", async () => {
    render(<AgentCard id="1" status="running" />);

    const pauseButton = screen.getByRole("button", { name: /pause agent/i });
    await fireEvent.click(pauseButton);

    expect(mockUpdateStatus).toHaveBeenCalledWith("1", "paused");
  });
});
