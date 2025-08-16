import React from "react";
import { Tab, TabContainer } from "./index.styles";

export interface IAuthTabs {
  activeRole: "customer" | "barber";
  onRoleChange: (role: "customer" | "barber") => void;
}
const AuthTabs: React.FC<IAuthTabs> = ({ activeRole, onRoleChange }) => (
  <TabContainer>
    <Tab
      active={activeRole === "customer"}
      onClick={() => onRoleChange("customer")}
    >
      Customer
    </Tab>
    <Tab
      active={activeRole === "barber"}
      onClick={() => onRoleChange("barber")}
    >
      Barber
    </Tab>
  </TabContainer>
);

export default AuthTabs;
