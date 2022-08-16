import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import ChooseLanguage from "../screens/Welcome/ChooseLanguage";
import WelcomeScreen from "../screens/Welcome/WelcomeScreen";
const Stack = createStackNavigator();

export default function WelcomeStack() {
    return (
        <>
            <Stack.Navigator screenOptions={{
                headerShown: false,
                gestureEnabled: false
            }} initialRouteName="Language">
                <Stack.Screen name="Language" component={ChooseLanguage} />
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
            </Stack.Navigator>
        </>
    )
}