import React from "react";
import { ScissorsWrapper } from "./index.styles";
import { SCISSORS_COUNT } from "../../../utils/constants";

const ScissorsBackground: React.FC = () => {
  return (
    <ScissorsWrapper>
      {Array.from({ length: SCISSORS_COUNT }).map((_, index) => (
        <div key={index} className={`scissor scissor-${index + 1}`} />
      ))}
    </ScissorsWrapper>
  );
};

export default ScissorsBackground;
