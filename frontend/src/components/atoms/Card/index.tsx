import React, { ReactNode } from "react";
import { theme } from "../../../styles/theme";

interface CardProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, style }) => {
  return (
    <div
      style={{
        backgroundColor: theme.colors.backgroundAlt || "#f9f9f9",
        padding: "1rem",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        minWidth: "220px",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Card;
