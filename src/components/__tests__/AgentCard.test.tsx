import { describe, it, expect } from "vitest";
import { render, screen } from "../test/test-utils";
import AgentCard from "../AgentCard";

describe("AgentCard", () => {
  it("renders with default props", () => {
    render(<AgentCard />);
    expect(screen.getByText("Agent Smith")).toBeInTheDocument();
  });

  it("shows correct status", () => {
    render(<AgentCard status="running" />);
    expect(screen.getByText("running")).toBeInTheDocument();
  });

  it("displays metrics correctly", () => {
    render(
      <AgentCard
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
});
