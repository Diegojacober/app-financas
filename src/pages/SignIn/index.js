import { Platform } from "react-native";
import * as S from "./styles";
import { useNavigation } from '@react-navigation/native'

export default function SignIn() {

    const navigation = useNavigation()

    return (
        <S.Background>
            <S.Container behavior={Platform.OS == 'ios' ? 'padding' : ''} enabled>
                <S.Logo
                source={require('../../../assets/Logo.png')}
                />

                <S.AreaInput>
                    <S.Input placeholder="Seu e-mail"/>
                </S.AreaInput>

                <S.AreaInput>
                    <S.Input placeholder="Sua senha" secureTextEntry={true}/>
                </S.AreaInput>

                <S.SubmitButton activeOpacity={0.8}>
                    <S.SubmitText>Acessar</S.SubmitText>
                </S.SubmitButton>

                <S.Link onPress={() => navigation.navigate('SignUp')}>
                    <S.LinkText>Criar uma nova conta</S.LinkText>
                </S.Link>
            </S.Container>
        </S.Background>
    )
}
