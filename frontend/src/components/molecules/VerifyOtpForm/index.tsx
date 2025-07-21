import React, { useRef, useState, useEffect } from "react";
import Typography from "../../atoms/Typography";
import Button from "../../atoms/Button";
import { OtpContainer, OtpInput } from "./index.styles";

interface VerifyOtpFormProps {
  otp: string;
  isLoading: boolean;
  error: string | null;
  onChange: (otp: string) => void; 
  onSubmit: (e: React.FormEvent) => void;
}

const VerifyOtpForm: React.FC<VerifyOtpFormProps> = ({
  otp,
  isLoading,
  error,
  onChange,
  onSubmit,
}) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [otpArray, setOtpArray] = useState<string[]>(Array(6).fill(""));

  useEffect(() => {
    const splitOtp = otp.split("").slice(0, 6);
    setOtpArray((prev) => {
      const newArr = [...prev];
      splitOtp.forEach((digit, idx) => (newArr[idx] = digit));
      return newArr;
    });
  }, [otp]);

  const handleInputChange = (value: string, index: number) => {
    const newOtpArray = [...otpArray];
    newOtpArray[index] = value.slice(-1); 
    setOtpArray(newOtpArray);

    onChange(newOtpArray.join("")); 

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Typography text="Enter OTP" variant="sm" weight="medium" />
      <OtpContainer>
        {otpArray.map((digit, index) => (
          <OtpInput
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInputChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </OtpContainer>

      {error && (
        <Typography
          text={error}
          color="red"
          variant="sm"
          style={{ marginTop: "8px" }}
        />
      )}

      <Button
        text={isLoading ? "Please wait..." : "Verify OTP"}
        buttonVariant="primary"
        style={{ width: "100%", marginTop: "16px" }}
        disabled={isLoading}
      />
    </form>
  );
};

export default VerifyOtpForm;
