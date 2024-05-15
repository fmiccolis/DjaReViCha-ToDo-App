import React, {createContext, useState} from 'react';
import {AuthResponse, UserProps} from "../types/dataTypes";
import axios from "axios";
import {
    LOGIN,
    LOGOUT,
    REGISTRATION,
    RESEND_EMAIL,
    RESET_PASSWORD,
    VERIFY_EMAIL
} from "../utils/endpoints";

interface ContextProps {
    user: UserProps
    setUser: React.Dispatch<React.SetStateAction<UserProps>>
    error: any
    setError: (error: any) => void
    register: (email: string, username: string, password1: string, password2: string) => void
    login: (username: string, password: string) => void
    logout: Function
    verify: (key: string) => void
    resend: (email: string) => void
    resetPassword: (email: string) => void
    authenticate: (authResponse: AuthResponse) => void
    testFunction: () => void
}

export const AppContext = createContext<ContextProps>(null)

interface AppProviderProps {
    children: React.ReactNode
}

const AppProvider = (props: AppProviderProps) => {
    const [ user, setUser] = useState<UserProps>(null);
    const [ error, setError] = useState<string[]>([]);

    const headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }

    const authenticate = (authResponse: AuthResponse) => {
        const userResponse = authResponse.user
        userResponse.access = authResponse.access
        userResponse.refresh = authResponse.refresh
        setUser(userResponse)
        setError(null)
    }

    return (
        <AppContext.Provider value={{
            user,
            setUser,
            error,
            setError,
            authenticate,
            register: (email, username, password1, password2) => {
                console.log("attempting register..", REGISTRATION, email, username, password1, password2);
                axios.defaults.headers.common["Authorization"] = null;
                const registrationData = { username, email, password1, password2 }
                axios
                    .post(REGISTRATION, registrationData, { headers })
                    .then((response) => {
                        console.log("RES", response);
                        authenticate(response.data)
                    })
                    .catch((error) => {
                        console.log("ERROR", {error});
                        let dataError = error.response.data
                        console.log({dataError});
                        if(typeof dataError === "string") dataError = ["Error"]
                        setError(dataError);
                    });
            },
            login: (username, password) => {
                console.log("attempting login..", LOGIN, username, password);
                axios.defaults.headers.common["Authorization"] = null;
                axios
                    .post(LOGIN, { username, password }, { headers })
                    .then((response) => {
                        console.log({response})
                        authenticate(response.data);
                    })
                    .catch((error) => {
                        console.log("ERROR", {error});
                        let dataError = error.response.data
                        console.log({dataError});
                        if(typeof dataError === "string") dataError = ["Error"]
                        setError(dataError);
                    });
            },
            logout: () => {
                console.log("logging out...");
                axios.defaults.headers.common["Authorization"] = null;
                axios
                    .post(LOGOUT, {refresh: user.refresh})
                    .then((response) => {
                        setUser(null);
                    })
                    .catch((error) => {
                        setUser(null);
                        console.log(error);
                    });
            },
            verify: (key) => {
                console.log("Verify email...", key);
                axios.defaults.headers.common["Authorization"] = null;
                axios
                    .post(VERIFY_EMAIL, { key })
                    .then((response) => {
                        console.log("RES", response);
                    })
                    .catch((error) => {
                        console.log("ERROR", {error});
                        let dataError = error.response.data
                        console.log({dataError});
                        if(typeof dataError === "string") dataError = ["Error"]
                        setError(dataError);
                    });
            },
            resend: (email) => {
                console.log("Resending verification email...", email);
                axios.defaults.headers.common["Authorization"] = null;
                axios
                    .post(RESEND_EMAIL, { email })
                    .then((response) => {
                        console.log("RES", response);
                    })
                    .catch((error) => {
                        console.log("ERROR", {error});
                        let dataError = error.response.data
                        console.log({dataError});
                        if(typeof dataError === "string") dataError = ["Error"]
                        setError(dataError);
                    });
            },
            resetPassword: (email) => {
                console.log("Sending reset password email...", email);
                axios.defaults.headers.common["Authorization"] = null;
                axios
                    .post(RESET_PASSWORD, { email })
                    .then((response) => {
                        console.log("RES", response);
                    })
                    .catch((error) => {
                        console.log("ERROR", {error});
                        let dataError = error.response.data
                        console.log({dataError});
                        if(typeof dataError === "string") dataError = ["Error"]
                        setError(dataError);
                    });
            },
            testFunction: () => {
                console.log("Test function for AppProvider")
            }
        }}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppProvider;