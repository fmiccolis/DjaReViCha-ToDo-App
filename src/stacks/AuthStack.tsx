import React from 'react';
import {Route, Routes} from "react-router-dom";
import PresentationPage from "../views/PresentationPage";
import LoginPage from "../views/LoginPage";
import RegistrationPage from "../views/RegistrationPage";

const AuthStack = () => {
    return (
        <Routes>
            <Route path={"/"} element={<PresentationPage />} />
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/registration"} element={<RegistrationPage />} />
        </Routes>
    );
};

export default AuthStack;