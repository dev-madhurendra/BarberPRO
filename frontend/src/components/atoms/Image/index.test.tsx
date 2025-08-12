import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Image from "./index";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../styles/theme";
import { OVERLAY_TEST_ID, OVERLAY_TEXT, IMAGE_WRAPPER_TEST_ID } from "../../../utils/constants";

const renderWithTheme = (iconUIComp: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{iconUIComp}</ThemeProvider>);
};

describe("Image component", () => {
  it("renders the image with src and alt", () => {
    renderWithTheme(<Image src="test.jpg" alt="Test image" />);
    const image = screen.getByAltText("Test image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test.jpg");
  });

  it("renders overlay and overlay content when props provided", () => {
    renderWithTheme(
      <Image
        src="test.jpg"
        alt="Test image"
        overlay
        overlayContent={<span>Overlay Text</span>}
      />
    );
    expect(screen.getByTestId(OVERLAY_TEST_ID)).toBeInTheDocument();
    expect(screen.getByText(OVERLAY_TEXT)).toBeInTheDocument();
  });

  it("applies styles for width, height, rounded, circle", () => {
    renderWithTheme(
      <Image
        src="test.jpg"
        alt="Test image"
        width="100px"
        height="150px"
        rounded
        circle
      />
    );
    const wrapper = screen.getByTestId(IMAGE_WRAPPER_TEST_ID); // see below for adding this
    expect(wrapper).toHaveStyle({
      width: "100px",
      height: "150px",
      "border-radius": "50%", // circle true means border-radius 50%
    });
  });
  it("applies border-radius 12px when rounded is true and circle is false", () => {
    const { getByTestId } = render(
      <Image rounded={true} circle={false} src="test.jpg" alt="Test image" />
    );
    const wrapper = getByTestId(IMAGE_WRAPPER_TEST_ID);
    expect(wrapper).toHaveStyle("border-radius: 12px");
  });

  it("applies border-radius 0 when both circle and rounded are false", () => {
    const { getByTestId } = render(
      <Image rounded={false} circle={false} src="test.jpg" alt="Test image" />
    );
    const wrapper = getByTestId(IMAGE_WRAPPER_TEST_ID);
    expect(wrapper).toHaveStyle("border-radius: 0");
  });

it("sets object-fit to 'cover' when cover is true", () => {
  render(<Image src="test.jpg" alt="Test image" cover={true} />);
  const image = screen.getByAltText("Test image");
  expect(image).toHaveStyle("object-fit: cover");
});

});
