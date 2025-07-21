import React, { useState } from "react";
import { ToastService } from "../../../utils/toastService";
import Typography from "../../atoms/Typography";
import { saveBarberProfile } from "../../../api/auth";
import axios from "axios";
import { Form, useNavigate } from "react-router-dom";
import { VALIDATE_BARBER_INFO_FIELDS } from "../../../utils/functionConfig";
import {
  ButtonContainer,
  Container,
  ErrorMessage,
  FieldContainer,
  FieldsGrid,
  FormWrapper,
  Header,
  Label,
  LoadingSpinner,
  StyledButton,
  StyledInput,
} from "./index.styles";

interface FormData {
  shopName: string;
  phoneNumber: string;
  address: string;
  city: string;
  pinCode: string;
  servicesOffered: string;
  startingPrice: string;
}

interface FormErrors {
  [key: string]: string;
}

const BarberProfileForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    shopName: "",
    phoneNumber: "",
    address: "",
    city: "",
    pinCode: "",
    servicesOffered: "",
    startingPrice: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const fieldLabels: Record<string, string> = {
    shopName: "Shop Name",
    phoneNumber: "Phone Number",
    address: "Address",
    city: "City",
    pinCode: "PIN Code",
    servicesOffered: "Services Offered",
    startingPrice: "Starting Price (₹)",
  };

  const validateField = (name: string, value: string): string => {
    return VALIDATE_BARBER_INFO_FIELDS(name, value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      ToastService.error("Please fix the errors in the form");
      return;
    }

    try {
      setIsLoading(true);
      await saveBarberProfile({
        ...formData,
        startingPrice: parseFloat(formData.startingPrice),
      });
      ToastService.success("Barber profile saved successfully!");
      navigate("/barber/dashboard");
    } catch (err: unknown) {
      let message = "Failed to save profile.";
      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      ToastService.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className={`scissor scissor-${i + 1}`} />
      ))}

      <FormWrapper>
        <Header>
          <Typography
            text="Update Barber Profile"
            variant="xl"
            weight="bold"
            style={{ fontSize: "28px", marginBottom: "8px" }}
          />
          <Typography
            text="Keep your profile information up to date to attract more customers"
            variant="sm"
            weight="medium"
            style={{ color: "#64748b", fontSize: "16px" }}
          />
        </Header>

        <Form onSubmit={handleSubmit}>
          <FieldsGrid>
            {Object.entries(formData).map(([key, value]) => (
              <FieldContainer key={key}>
                <Label hasError={!!errors[key]}>
                  {fieldLabels[key] || key}
                </Label>
                <StyledInput
                  name={key}
                  value={value}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={`Enter ${
                    fieldLabels[key]?.toLowerCase() || key
                  }`}
                  hasError={touched[key] && !!errors[key]}
                  type={key === "startingPrice" ? "number" : "text"}
                />
                {touched[key] && errors[key] && (
                  <ErrorMessage className="show">⚠️ {errors[key]}</ErrorMessage>
                )}
              </FieldContainer>
            ))}
          </FieldsGrid>

          <ButtonContainer>
            {isLoading && <LoadingSpinner />}
            <StyledButton
              text={isLoading ? "Saving Profile..." : "Save Profile"}
              buttonVariant="primary"
              disabled={isLoading}
              isLoading={isLoading}
              onClick={handleSubmit}
            />
          </ButtonContainer>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default BarberProfileForm;
