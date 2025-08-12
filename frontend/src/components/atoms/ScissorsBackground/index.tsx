import React from "react";
import { ScissorsWrapper } from "./index.styles";
import { SCISSORS_COUNT, SCISSORS_WRAPPER_TEST_ID } from "../../../utils/constants";

const ScissorsBackground: React.FC = () => {
  return (
    <ScissorsWrapper data-testid={SCISSORS_WRAPPER_TEST_ID}>
      {Array.from({ length: SCISSORS_COUNT }).map((_, index) => (
        <div data-testid={`scissor-${index + 1}`} key={index} className={`scissor scissor-${index + 1}`} />
      ))}
    </ScissorsWrapper>
  );
};

export default ScissorsBackground;
