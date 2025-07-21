import { FaCut } from "react-icons/fa"; // Scissor Icon
import { theme } from "../../../styles/theme";
import Typography from "../Typography";
import { LogoWrapper } from "./index.styles";

export const Logo = () => {
  return (
    <LogoWrapper>
      <FaCut />
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
