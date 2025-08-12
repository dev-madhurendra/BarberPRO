import React, { ReactNode } from "react";
import { ImageWrapper, StyledImage, Overlay, OverlayContent } from "./index.styles";
import { IMAGE_WRAPPER_TEST_ID, OVERLAY_TEST_ID } from "../../../utils/constants";

interface IImage extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: string;
  height?: string;
  rounded?: boolean;
  circle?: boolean;
  cover?: boolean;
  overlay?: boolean;
  overlayContent?: ReactNode;
}

const Image: React.FC<IImage> = ({
  width,
  height,
  rounded,
  circle,
  cover,
  overlay,
  overlayContent,
  ...props
}) => {
  return (
    <ImageWrapper data-testid={IMAGE_WRAPPER_TEST_ID} width={width} height={height} rounded={rounded} circle={circle}>
      <StyledImage {...props} cover={cover} />
      {overlay && <Overlay data-testid={OVERLAY_TEST_ID} />}
      {overlayContent && <OverlayContent>{overlayContent}</OverlayContent>}
    </ImageWrapper>
  );
};

export default Image;
