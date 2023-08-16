import React, { createContext, useState } from "react";
import { useNavigation } from '@react-navigation/native'
export const AuthContext = createContext({});
import api from "../services/api";

export default function AuthProvider({ children }) {

    const navigation = useNavigation()

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);

    async function signUp(name, email, password) {
        setLoadingAuth(true)
        if (!name || !password || !email) {
            throw new Error("Required")
        }

        console.log("aqui")
        const response = await api.post('/users', {
            name: name,
            email: email,
            password: password,
        }).then((resp) => {
            console.log(resp)
            setLoadingAuth(false)
            navigation.goBack()
        })
        .catch(e => {
            setLoadingAuth(false)
            console.log(e)
        })
}

    return (
        <AuthContext.Provider value={{ user, setUser, signUp, loadingAuth }}>
            {children}
        </AuthContext.Provider>
    )
}
