import { View, Text } from "react-native";
import * as S from '../SignIn/styles';
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

export default function SignUp() {

    const { user } = useContext(AuthContext);

    const handleSignUp = () => {
        alert('opa')
    }

    return (
        <S.Background>
            <S.Container behavior={Platform.OS == 'ios' ? 'padding' : ''} enabled>


                <S.AreaInput>
                    <S.Input placeholder="Nome" />
                </S.AreaInput>

                <S.AreaInput>
                    <S.Input placeholder="Email" keyboardType="email-address" />
                </S.AreaInput>

                <S.AreaInput>
                    <S.Input placeholder="Senha" secureTextEntry={true}/>
                </S.AreaInput>

                <S.SubmitButton activeOpacity={0.8} onPress={handleSignUp}>
                    <S.SubmitText>Cadastrar</S.SubmitText>
                </S.SubmitButton>
            </S.Container>
        </S.Background>
    )
}
