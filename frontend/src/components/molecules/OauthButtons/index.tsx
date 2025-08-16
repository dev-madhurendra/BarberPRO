import React from "react";
import { Divider, SocialButtons } from "../../organisms/AuthForm/index.styles";
import { SOCIAL_LOGIN_BUTTONS } from "../../../utils/functionConfig";

interface SocialLoginButtonsProps {
  title?: string;
  onGoogleClick?: () => void;
  onGithubClick?: () => void;
  onTwitterClick?: () => void;
}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
  title = "Or continue with",
  onGoogleClick,
  onGithubClick,
  onTwitterClick,
}) => {
  const socialButtons = SOCIAL_LOGIN_BUTTONS(
    onTwitterClick,
    onGithubClick,
    onGoogleClick
  );

  return (
    <>
      <Divider>{title}</Divider>
      <SocialButtons data-testid="social-buttons">
        {socialButtons.map((btn, index) => (
          <button
            key={index}
            type="button"
            onClick={btn.onClick}
            className={btn.className}
            
          >
            {btn.icon}
          </button>
        ))}
      </SocialButtons>
    </>
  );
};

export default SocialLoginButtons;
