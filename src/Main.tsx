import React, {useContext} from 'react';
import AppStack from "./stacks/AppStack";
import {AppContext} from "./providers/AppProvider";
import AuthStack from "./stacks/AuthStack";

const Main = () => {
    const {user} = useContext(AppContext);

    return user && user.id ? <AppStack /> : <AuthStack />
};

export default Main;