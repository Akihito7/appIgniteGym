import { api } from "@services/axios";
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({} as AuthContextProps);


type UserProps = {
    token: string;
    refresh_token: string;
    user: {
        id: string;
        name: string;
        email: string;
        avatar: string;
    }

}
type AuthContextProps = {
    signln: (email: string, password: string) => void;
    logout(): void;
    user: UserProps;
};

function AuthContextProvider({ children }: { children: ReactNode }) {

    const nameStorage = '@akihitogym:user';
    const tokenStorage = "@akihitogym:token";
    const refreshStorage = "@akihitogym:refreshtoken";

    const [user, setUser] = useState({} as UserProps);

    async function signln(email: string, password: string) {

        const response = await api.post('/sessions', { email, password });

        setUser(response.data);

        const infoLogin = {
            email,
            password
        };

        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

        await AsyncStorage.setItem(nameStorage, JSON.stringify(infoLogin));
        await AsyncStorage.setItem(tokenStorage, JSON.stringify(response.data.token));
        await AsyncStorage.setItem(refreshStorage, JSON.stringify(response.data.refresh_token))
    };

    async function logout() {
        await AsyncStorage.removeItem(nameStorage);
        await AsyncStorage.removeItem(tokenStorage);

        setUser({} as UserProps);
    }

    async function tryLoginWithAsyncStorage() {

        const userAsync = await AsyncStorage.getItem(nameStorage) || '{}';

        const infoLogin = JSON.parse(userAsync);

        const { email, password } = infoLogin;

        if (email && password) signln(email, password)

    };


    useEffect(() => {
        tryLoginWithAsyncStorage();
    }, [])

    useEffect(() => {

        const subscribe = api.registerIntercpetTokenManager(logout);

        return () => {
            subscribe();
        };
    }, [])

    return <AuthContext.Provider value={{
        signln,
        logout,
        user,
    }}>
        {children}
    </AuthContext.Provider>
};

function useAuth() {
    const data = useContext(AuthContext);
    return data;
}

export { AuthContextProvider, useAuth }