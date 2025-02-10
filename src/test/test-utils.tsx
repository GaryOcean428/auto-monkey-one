import { render as rtlRender } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ReactNode } from "react";

export function render(ui: ReactNode) {
  return rtlRender(<BrowserRouter>{ui}</BrowserRouter>);
}

export * from "@testing-library/react";
