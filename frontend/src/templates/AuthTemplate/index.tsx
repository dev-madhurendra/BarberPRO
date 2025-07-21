import React from "react";
import { AuthContainer, FormSection, FormWrapper } from "./index.styles";
import Image from "../../components/atoms/Image";
import HeroOverlayContent from "../../components/molecules/HeroOverlayContent";
import ScissorsBackground from "../../components/atoms/ScissorsBackground";

interface IAuthTemplate {
  children: React.ReactNode;
}

const AuthTemplate: React.FC<IAuthTemplate> = ({ children }) => {
  return (
    <AuthContainer>
      <Image
        src="https://i.pinimg.com/736x/8a/2f/a4/8a2fa4cfc6eac8010440615159092e87.jpg"
        width="50%"
        height="100%"
        overlay
        cover
        overlayContent={<HeroOverlayContent />}
      />
      <FormSection>
        <ScissorsBackground />
        <FormWrapper>{children}</FormWrapper>
      </FormSection>
    </AuthContainer>
  );
};

export default AuthTemplate;
