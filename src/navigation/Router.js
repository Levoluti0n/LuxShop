import React, { useContext } from 'react';

import AppStack from './AppStack';
import AuthStack from './AuthStack';
import WelcomeStack from './WelcomeStack';
import { AuthContext } from '../context/AuthContext';
import SplashScreen from '../screens/Splash/SplashScreen';


export default function Router() {
    const { user, loading, language } = useContext(AuthContext);
    if (loading) {
        return <SplashScreen />
    }

    return user ? <AppStack /> : language ? <AuthStack /> : <WelcomeStack />;
}


