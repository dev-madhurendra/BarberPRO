import React from "react";
import { render, screen } from "@testing-library/react";
import {describe,it,expect} from 'vitest';
import { ThemeProvider } from "styled-components";
import HeroOverlayContent from "./index";
import { HERO_OVERLAY_TEXT } from "../../../utils/constants";
import { theme } from "../../../styles/theme";


const renderWithTheme = (ui: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe("HeroOverlayContent", () => {
  it("should renders the main heading with Logo", () => {
    renderWithTheme(<HeroOverlayContent />);
    expect(screen.getByText("Barber")).toBeInTheDocument();
  });

  it("should renders the tagline text", () => {
    renderWithTheme(<HeroOverlayContent />);
    expect(
      screen.getByText("Your complete barber management solution")
    ).toBeInTheDocument();
  });

  it("should renders all feature items from HERO_OVERLAY_TEXT", () => {
    renderWithTheme(<HeroOverlayContent />);
    HERO_OVERLAY_TEXT.forEach((feature) => {
      expect(screen.getByText(feature.title)).toBeInTheDocument();
      expect(screen.getByText(feature.desc)).toBeInTheDocument();
    });
  });

  it("renders correct number of feature titles", () => {
    renderWithTheme(<HeroOverlayContent />);
    const titles = HERO_OVERLAY_TEXT.map((f) => f.title);
    titles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
    expect(titles).toHaveLength(HERO_OVERLAY_TEXT.length);
  });
  
});
