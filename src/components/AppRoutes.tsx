import React, {useEffect} from 'react';
import {Route, Routes, useLocation, Navigate} from "react-router-dom";
import {routes} from "../routes";
import HomePage from "../views/HomePage";

const AppRoutes = () => {
    const location = useLocation()
    useEffect(
        () => {
          let route = routes.find(({destination}) => destination === location.pathname);
          document.title = "Your Site" + (route ? " - "+route.name : "");
        },
        [location]
    )
    return (
        <Routes>
            <Route path={"*"} element={<HomePage />} />
            {routes.map((route) => (
                <Route key={route.name} path={route.destination} element={route.element} />
            ))}
        </Routes>
    );
};

export default AppRoutes;