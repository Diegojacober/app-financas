import { ActivityIndicator, Platform } from "react-native";
import * as S from "./styles";
import { useNavigation } from '@react-navigation/native'
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";

export default function SignIn() {

    const navigation = useNavigation()
    const { signIn, loadingAuth } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleLogin() {

        if (loadingAuth) {
            return alert('Carregando')
        }

        if (email == '' || password == '') {
            return alert('Preencha todos os campos')
        } 
        return signIn(email, password)
    }

    return (
        <S.Background>
            <S.Container behavior={Platform.OS == 'ios' ? 'padding' : ''} enabled>
                <S.Logo
                    source={require('../../../assets/Logo.png')}
                />

                <S.AreaInput>
                    <S.Input placeholder="Seu e-mail" value={email} onChangeText={setEmail} />
                </S.AreaInput>

                <S.AreaInput>
                    <S.Input placeholder="Sua senha" secureTextEntry={true} value={password} onChangeText={setPassword} />
                </S.AreaInput>

                <S.SubmitButton activeOpacity={loadingAuth ? 1 : 0.7} onPress={handleLogin}>

                    {
                        loadingAuth ? (
                            <ActivityIndicator size={20} color={'#FFF'}/>
                        ) : (
                            <S.SubmitText>Acessar</S.SubmitText>
                        )
                    }
                </S.SubmitButton>

                <S.Link onPress={() => navigation.navigate('SignUp')}>
                    <S.LinkText>Criar uma nova conta</S.LinkText>
                </S.Link>
            </S.Container>
        </S.Background>
    )
}
