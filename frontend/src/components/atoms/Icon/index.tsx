import React from "react";
import { IconType } from "react-icons";
import { StyledIcon } from "./index.styles";
import { STYLED_ICON_TEST_ID } from "../../../utils/constants";

interface IIcon {
  icon: IconType;
  size?: string;
  color?: string;
  onClick?: () => void;
}

const Icon: React.FC<IIcon> = ({ icon: IconComp, size, color, onClick }) => {
  return (
    <StyledIcon size={size} color={color} onClick={onClick} data-testid={STYLED_ICON_TEST_ID}>
      <IconComp />
    </StyledIcon>
  );
};

export default Icon;
