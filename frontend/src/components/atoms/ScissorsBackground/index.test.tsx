import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import ScissorsBackground from "./index";

import { SCISSORS_COUNT } from "../../../utils/constants";
describe("ScissorsBackground component", () => {
  it("should render the ScissorsWrapper container", () => {
    render(<ScissorsBackground />);
    const wrapper = screen.getByTestId("scissors-wrapper");
    expect(wrapper).toBeInTheDocument();
  });

  it(`should render exactly ${SCISSORS_COUNT} scissors`, () => {
    render(<ScissorsBackground />);
    const scissors = screen.getAllByTestId(/scissor-/);
    expect(scissors.length).toBe(SCISSORS_COUNT);
  });

  it("should render divs with correct test ids", () => {
    render(<ScissorsBackground />);
    for (let i = 1; i <= SCISSORS_COUNT; i++) {
      expect(screen.getByTestId(`scissor-${i}`)).toBeInTheDocument();
    }
  });
});
