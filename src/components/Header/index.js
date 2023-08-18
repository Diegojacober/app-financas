import { Container, Title, ButtonMenu } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from '@expo/vector-icons';

export default function Header({ title }) {

    const navigation = useNavigation();

    return (
        <Container>
            <ButtonMenu onPress={() => navigation.openDrawer()}>
                <Entypo name="menu" size={35} color="#121212" />
            </ButtonMenu>
            {title && (
                <Title>{title}</Title>
            )}


        </Container>
    )
}
