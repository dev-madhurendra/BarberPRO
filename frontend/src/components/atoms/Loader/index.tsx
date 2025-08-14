import React from "react";
import { Wrapper, Spinner, Message, SubText } from "./index.styles";
import { LOADER_TEST_ID } from "../../../utils/constants";

interface ILoader {
  loading?: boolean;
}

const OAuthLoader: React.FC<ILoader> = ({ loading = true }) => {
  return (
    <Wrapper>
      <Spinner data-testid={LOADER_TEST_ID} />
      <Message>{loading ? "Authenticating with Google..." : "Redirecting..."}</Message>
      <SubText>Please wait while we set up your account and route you.</SubText>
    </Wrapper>
  );
};

export default OAuthLoader;
