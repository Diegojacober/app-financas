import { useContext } from "react";
import Header from "../../components/Header";
import { Container, Message, Name, NewLink, NewText, LogoutButton, LogoutText } from "./styles";

import { AuthContext } from '../../contexts/auth';
import { useNavigation } from "@react-navigation/native";

export default function Profile() {

    const navigator = useNavigation()

    const { user, signOut } = useContext(AuthContext)

    return(
        <Container>
            <Header title={"Meu perfil"} />
            <Message>Bem vindo de volta</Message>

            <Name numberOfLines={1}>
                { user && user.name }
            </Name>

            <NewLink onPress={() => navigator.navigate('Registrar')}>
                <NewText>Fazer registro</NewText>
            </NewLink>

            <LogoutButton onPress={() => signOut()}>
                <LogoutText>Sair</LogoutText>
            </LogoutButton>

        </Container>
    )
}
