import React from "react";
import Typography from "../../atoms/Typography";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import SocialLoginButtons from "../OauthButtons";
import { REGISTER_FORM_INPUT_FIELDS } from "../../../utils/functionConfig";
import { LinkTextWrapper } from "../LoginForm/index.styles";
import { REGISTER_FORM } from "../../../utils/constants";

export interface RegisterFormProps {
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
}

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
    <form onSubmit={onSubmit} aria-label={REGISTER_FORM}>
      {fields.map((field, index) => (
        <div key={field.name} style={{ marginTop: index > 0 ? "12px" : "0" }}>
          <Typography text={field.label} variant="sm" weight="medium" />
          <Input
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={field.value}
            onChange={onChange}
          />
        </div>
      ))}

      {error && (
        <Typography
          text={error}
          color="red"
          variant="sm"
          style={{ marginTop: "8px" }}
        />
      )}

      <Button
        text={isLoading ? "Please wait..." : "Register"}
        buttonVariant="primary"
        style={{ width: "100%", marginTop: "16px" }}
        disabled={isLoading}
      />

      <SocialLoginButtons 
        onGoogleClick={() => console.log("Google Login")}
        onGithubClick={() => console.log("GitHub Login")}
        onTwitterClick={() => console.log("Twitter Login")}
      />

      <LinkTextWrapper>
        <Typography text="Already have an account?" className="text" />
        <Typography text="Login" className="link" onClick={onToggleMode} />
      </LinkTextWrapper>
    </form>
  );
};

export default RegisterForm;
