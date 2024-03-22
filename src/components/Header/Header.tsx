import { FC } from "react";
import NolanMurphy from "../../assets/Nolan-Murphy.png";
import { HeaderContainer, Logo } from "./Header.styles.ts";

export const Header: FC = () => (
    <HeaderContainer>
        <Logo
            src={NolanMurphy}
            className="logo react"
            alt="Nolan and Murphy in a heartshape"
        />
    </HeaderContainer>
);
