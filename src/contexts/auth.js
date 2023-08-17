import React, { createContext, useState } from "react";
import { useNavigation } from '@react-navigation/native'
export const AuthContext = createContext({});
import api from "../services/api";

export default function AuthProvider({ children }) {

    const navigation = useNavigation()

    const [user, setUser] = useState();
    const [loadingAuth, setLoadingAuth] = useState(false);

    async function signUp(name, email, password) {
        setLoadingAuth(true)
        if (!name || !password || !email) {
            throw new Error("Required")
        }

        const response = await api.post('/users', {
            name: name,
            email: email,
            password: password,
        }).then((resp) => {
            console.log(resp.data)
            setLoadingAuth(false)
            navigation.goBack()
        })
            .catch(e => {
                setLoadingAuth(false)
                console.log(e)
            })
    }

    async function signIn(email, password) {
        setLoadingAuth(true)
        console.log(email, password)
        const response = await api.post("/login", { email: email, password: password })
            .then((resp) => {
                const { id, name, token } = resp.data

                const data = {
                    id,
                    name,
                    token,
                    email
                }

                api.defaults.headers['Authorization'] = `Bearer ${token}`

                setUser(data)
                setLoadingAuth(false)
            })
            .catch(e => {
                setLoadingAuth(false)
                console.log(e)
                alert('Erro ao logar')
            })

    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, setUser, signUp, loadingAuth, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}
