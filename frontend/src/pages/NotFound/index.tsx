import React from 'react';
import Button from '../../components/atoms/Button';
import {
  BigText,
  Overlay,
  ScissorIcon,
  Tagline,
  Wrapper,
} from './index.styles';
import { useNavigate } from '@tanstack/react-router';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Overlay />
      <ScissorIcon>✂</ScissorIcon>
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
        buttonVariant="primary"
        onClick={() =>
          navigate({
            to: '/',
          })
        }
        style={{
          padding: '14px 28px',
          fontSize: '1.1rem',
          borderRadius: '8px',
          zIndex: 2,
        }}
        text="Return to Dashboard"
      />
    </Wrapper>
  );
};

export default NotFoundPage;
