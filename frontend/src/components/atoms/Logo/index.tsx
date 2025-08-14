import { FaCut } from "react-icons/fa"; // Scissor Icon
import { theme } from "../../../styles/theme";
import Typography from "../Typography";
import { LogoWrapper } from "./index.styles";
import { SCISSOR_ICON_TEST_ID } from "../../../utils/constants";

export const Logo = () => {
  return (
    <LogoWrapper>
      <FaCut data-testid={SCISSOR_ICON_TEST_ID} />
      Barber
      <Typography
        as="h1"
        text="PRO"
        weight="bold"
        color={theme.colors.accent}
        style={{ display: "inline" }}
      />
    </LogoWrapper>
  );
};
