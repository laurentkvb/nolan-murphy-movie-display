import { FC } from "react";
import { Fade } from "react-swift-reveal";
import spinner from "../../assets/spinner.gif";
import { SpinnerContainer, SpinnerImage } from "./Spinner.styles.ts";

export const Spinner: FC = () => (
  <Fade>
    <SpinnerContainer>
      <SpinnerImage src={spinner} alt="spinner gif for loading" />
    </SpinnerContainer>
  </Fade>
);
