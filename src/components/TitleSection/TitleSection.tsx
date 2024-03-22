import { FC } from "react";
import { Title, TitleContainer } from "./TitleSection.styles.ts";

export const TitleSection: FC = () => (
  <TitleContainer>
    {["Christopher Nolan", "&", "Cillian Murphy", "Movie Collaborations"].map(
      (segment, index) => (
        <Title key={index}>{segment}</Title>
      ),
    )}
  </TitleContainer>
);
