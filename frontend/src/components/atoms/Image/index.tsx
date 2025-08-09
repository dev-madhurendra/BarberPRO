import React, { ReactNode } from "react";
import { ImageWrapper, StyledImage, Overlay, OverlayContent } from "./index.styles";

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
    <ImageWrapper data-testid="image-wrapper" width={width} height={height} rounded={rounded} circle={circle}>
      <StyledImage {...props} cover={cover} />
      {overlay && <Overlay data-testid="overlay" />}
      {overlayContent && <OverlayContent>{overlayContent}</OverlayContent>}
    </ImageWrapper>
  );
};

export default Image;
