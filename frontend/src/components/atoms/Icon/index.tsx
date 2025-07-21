import React from "react";
import { IconType } from "react-icons";
import { StyledIcon } from "./index.styles";

interface IIcon {
  icon: IconType;
  size?: string;
  color?: string;
  onClick?: () => void;
}

const Icon: React.FC<IIcon> = ({ icon: IconComp, size, color, onClick }) => {
  return (
    <StyledIcon size={size} color={color} onClick={onClick}>
      <IconComp />
    </StyledIcon>
  );
};

export default Icon;
