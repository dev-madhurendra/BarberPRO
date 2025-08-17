import React from 'react';
import Typography from '../../atoms/Typography';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import SocialLoginButtons from '../OauthButtons';
import { REGISTER_FORM_INPUT_FIELDS } from '../../../utils/functionConfig';
import { LinkTextWrapper } from '../LoginForm/index.styles';

type RegisterFormProps = {
  formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  isLoading: boolean;
  error: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onToggleMode: () => void;
};

const RegisterForm: React.FC<RegisterFormProps> = ({
  formData,
  isLoading,
  error,
  onChange,
  onSubmit,
  onToggleMode,
}) => {
  const fields = REGISTER_FORM_INPUT_FIELDS(formData);

  return (
    <form onSubmit={onSubmit}>
      {fields.map((field, index) => (
        <div key={field.name} style={{ marginTop: index > 0 ? '12px' : '0' }}>
          <Typography text={field.label} variant="sm" weight="medium" />
          <Input
            name={field.name}
            onChange={onChange}
            placeholder={field.placeholder}
            type={field.type}
            value={field.value}
          />
        </div>
      ))}

      {error && (
        <Typography
          color="red"
          style={{ marginTop: '8px' }}
          text={error}
          variant="sm"
        />
      )}

      <Button
        buttonVariant="primary"
        disabled={isLoading}
        style={{ width: '100%', marginTop: '16px' }}
        text={isLoading ? 'Please wait...' : 'Register'}
      />

      {/* <SocialLoginButtons */}
      {/*   onGoogleClick={() => console.log("Google Login")} */}
      {/*   onGithubClick={() => console.log("GitHub Login")} */}
      {/*   onTwitterClick={() => console.log("Twitter Login")} */}
      {/* /> */}

      <LinkTextWrapper>
        <Typography className="text" text="Already have an account?" />
        <Typography className="link" onClick={onToggleMode} text="Login" />
      </LinkTextWrapper>
    </form>
  );
};

export default RegisterForm;
