import React from "react";
import { Wrapper, Spinner, Message, SubText } from "./index.styles";

interface ILoader {
  loading?: boolean;
}

const OAuthLoader: React.FC<ILoader> = ({ loading = true }) => {
  return (
    <Wrapper>
      <Spinner />
      <Message>{loading ? "Authenticating with Google..." : "Redirecting..."}</Message>
      <SubText>Please wait while we set up your account and route you.</SubText>
    </Wrapper>
  );
};

export default OAuthLoader;
