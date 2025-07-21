import React from "react";
import { OverlayWrapper, FeatureGrid } from "./index.styles";
import Typography from "../../atoms/Typography";
import { HERO_OVERLAY_TEXT } from "../../../utils/constants";
import { theme } from "../../../styles/theme";
import { Logo } from "../../atoms/Logo";
import FeatureItem from "../FeatureItems";

const HeroOverlayContent = () => {
  return (
    <OverlayWrapper>
      <Typography
        as="h1"
        text={<Logo />}
        variant="xxl"
        weight="bold"
        color={theme.colors.inputBg}
      />

      <Typography
        variant="lg"
        color="white"
        style={{ opacity: 0.9 }}
        text="Your complete barber management solution"
      />

      <FeatureGrid>
        {HERO_OVERLAY_TEXT.map((feature) => (
          <FeatureItem
            key={feature.id}
            id={feature.id}
            title={feature.title}
            desc={feature.desc}
          />
        ))}
      </FeatureGrid>
    </OverlayWrapper>
  );
};

export default HeroOverlayContent;
