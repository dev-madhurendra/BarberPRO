import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/Button";
import { BigText, Overlay, ScissorIcon, Tagline, Wrapper } from "./index.styles";


const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Overlay />
      <ScissorIcon>✂️</ScissorIcon>
      <BigText
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        404
      </BigText>
      <Tagline>
        Oops! This page got a clean shave and vanished from our barbershop.
      </Tagline>
      <Button
        text="Return to Dashboard"
        buttonVariant="primary"
        onClick={() => navigate("/")}
        style={{
          padding: "14px 28px",
          fontSize: "1.1rem",
          borderRadius: "8px",
          zIndex: 2,
        }}
      />
    </Wrapper>
  );
};

export default NotFoundPage;
