import React, {useContext} from 'react';
import SidebarWithHeader from "../layouts/SidebarWithHeader";
import AppRoutes from "../components/AppRoutes";
import {AppContext} from "../providers/AppProvider";
import axios from "axios";
import {REFRESH} from "../utils/endpoints";

const AppStack = () => {
    const { user, setUser, logout } = useContext(AppContext);

    axios.defaults.headers.common["Authorization"] = `Bearer ${user.access}`;

    const refreshToken = () => {
        axios.defaults.headers.common["Authorization"] = null;
        return axios.post(REFRESH, { refresh: user.refresh});
    }

    axios.interceptors.response.use((res) => {
        return res;
    }, async (err) => {
        const originalConfig = err.config;
        if (err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry && originalConfig.url !== REFRESH) {
                originalConfig._retry = true;

                try {
                    const rs = await refreshToken();
                    const { access, refresh } = rs.data;
                    user.access = access;
                    user.refresh = refresh;
                    setUser(user);
                    axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
                    delete originalConfig.headers["Authorization"];
                    return axios(originalConfig);
                } catch (_error) {
                    if (_error.response && _error.response.data) {
                        return Promise.reject(_error.response.data);
                    }
                    return Promise.reject(_error);
                }
            }

            if (err.response.status === 403 && err.response.data) {
                return Promise.reject(err.response.data);
            }
        }

        if(err.code === "token_not_valid") {
            console.log("this is token_not_valid")
            try {
                const rs = await refreshToken();
                const { access, refresh } = rs.data;
                user.access = access;
                user.refresh = refresh;
                setUser(user);
                axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
                delete originalConfig.headers["Authorization"];
                return axios(originalConfig);
            } catch (_error) {
                if (_error.response && _error.response.data) {
                    return Promise.reject(_error.response.data);
                }
                return Promise.reject(_error);
            }
        }

        return Promise.reject(err);
    });

    return (
        <SidebarWithHeader>
            <AppRoutes />
        </SidebarWithHeader>
    );
};

export default AppStack;