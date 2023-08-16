import { ActivityIndicator } from "react-native";
import * as S from '../SignIn/styles';
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";

export default function SignUp() {

    const { signUp, loadingAuth } = useContext(AuthContext);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSignUp = () => {
        try {
            signUp(name, email, password)
        }
        catch (e) {
            alert(e.message)
        }
    }
    return (
        <S.Background>
            <S.Container behavior={Platform.OS == 'ios' ? 'padding' : ''} enabled>


                <S.AreaInput>
                    <S.Input placeholder="Nome" value={name} onChangeText={setName} />
                </S.AreaInput>

                <S.AreaInput>
                    <S.Input placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
                </S.AreaInput>

                <S.AreaInput>
                    <S.Input placeholder="Senha" secureTextEntry={true} value={password} onChangeText={setPassword} />
                </S.AreaInput>

                <S.SubmitButton activeOpacity={0.8} onPress={handleSignUp}>
                    {
                        loadingAuth ? (
                            <ActivityIndicator size={20} color='#FFF' />
                        ) : (
                            <S.SubmitText>Cadastrar</S.SubmitText>
                        )
                    }
                </S.SubmitButton>
            </S.Container>
        </S.Background>
    )
}
