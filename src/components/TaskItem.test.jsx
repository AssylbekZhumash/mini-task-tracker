import { describe, it, expect, vi } from "vitest";
import { createRoot } from "react-dom/client";
import { act } from "react";
import TaskItem from "./TaskItem.jsx";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe("TaskItem", () => {
  it("calls onToggle with the task id when the checkbox is clicked", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    const onToggle = vi.fn();
    const task = { id: "abc", title: "Write report", completed: false };

    act(() => {
      root.render(
        <TaskItem task={task} onToggle={onToggle} onDelete={() => {}} />
      );
    });

    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).not.toBeNull();
    expect(checkbox.checked).toBe(false);

    act(() => {
      checkbox.click();
    });

    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith("abc");

    act(() => {
      root.unmount();
    });
    container.remove();
  });
});
