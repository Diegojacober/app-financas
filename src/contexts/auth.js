import React, { createContext, useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext({});
import api from "../services/api";

export default function AuthProvider({ children }) {

    const navigation = useNavigation();

    const [user, setUser] = useState();
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorage() {
            const storageUser = await AsyncStorage.getItem("@finToken")

            if (storageUser) {
                const response = await api.get('/me', {
                    headers: {
                        'Authorization': `Bearer ${storageUser}`
                    }
                    
                }).catch(() => {

                    setUser(null)
                })

                api.defaults.headers['Authorization'] = `Bearer ${storageUser}`;
                setUser(response.data)
            }
           setLoading(false)
        }

        loadStorage()
    }, []);

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
        const response = await api.post("/login", { email: email, password: password })
            .then((resp) => {
                const { id, name, token } = resp.data

                const data = {
                    id,
                    name,
                    token,
                    email
                }

                api.defaults.headers['Authorization'] = `Bearer ${token}`;
                AsyncStorage.setItem("@finToken", token)
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
        <AuthContext.Provider value={{ signed: !!user, user, setUser, signUp, loadingAuth, signIn, loading }}>
            {children}
        </AuthContext.Provider>
    )
}
