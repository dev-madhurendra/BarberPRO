import React from "react";
import Typography from "../../atoms/Typography";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import { theme } from "../../../styles/theme";
import SocialLoginButtons from "../OauthButtons";
import { LinkTextWrapper, OptionsWrapper } from "./index.styles";
import { LOGIN_FORM_INPUT_FIELDS } from "../../../utils/functionConfig";

interface LoginFormProps {
  email: string;
  password: string;
  isLoading: boolean;
  error: string | null;
  role: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onToggleMode: () => void;
  onForgotPassword: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  isLoading,
  error,
  role,
  onChange,
  onSubmit,
  onToggleMode,
  onForgotPassword,
}) => {
  const inputFields = LOGIN_FORM_INPUT_FIELDS(email, password);
  const handleGoogleLogin = (role: string) => {
    window.location.href = `http://localhost:8080/api/v1/oauth/google/init?role=${role}`;
  };

  return (
    <form onSubmit={onSubmit}>
      {inputFields.map((field, index) => (
        <div key={field.name} style={{ marginTop: index === 0 ? 0 : "12px" }}>
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

      <OptionsWrapper>
        <label>
          <input type="checkbox" /> Remember me
        </label>
        <Typography
          text="Forgot password?"
          color={theme.colors.accent}
          style={{ cursor: "pointer" }}
          onClick={onForgotPassword}
        />
      </OptionsWrapper>

      {error && (
        <Typography
          text={error}
          color="red"
          variant="sm"
          style={{ marginTop: "8px" }}
        />
      )}

      <Button
        text={isLoading ? "Please wait..." : "Sign in"}
        buttonVariant="primary"
        style={{ width: "100%", marginTop: "16px" }}
        disabled={isLoading}
      />

      <SocialLoginButtons
        onGoogleClick={() => handleGoogleLogin(role)}
        onGithubClick={() => console.log("GitHub Login")}
        onTwitterClick={() => console.log("Twitter Login")}
      />

      <LinkTextWrapper>
        <Typography
          text="Don't have an account?"
          align="center"
          className="text"
        />
        <Typography onClick={onToggleMode} text="Register" className="link" />
      </LinkTextWrapper>
    </form>
  );
};

export default LoginForm;
