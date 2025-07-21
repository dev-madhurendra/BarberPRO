import React from "react";
import { Grid } from "@mui/material";
import Typography from "../../atoms/Typography";
import { Circle } from "./index.styles";

interface FeatureItemProps {
  id: number;
  title: string;
  desc: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ id, title, desc }) => (
  <>
    <Circle>{id}</Circle>
    <Grid>
      <Typography as="h4" variant="md" weight="bold" color="white" text={title} />
      <Typography variant="sm" color="white" style={{ opacity: 0.8 }} text={desc} />
    </Grid>
  </>
);

export default FeatureItem;
