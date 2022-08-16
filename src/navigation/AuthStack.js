import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import PhoneSignScreen from '../screens/Sign/PhoneSign/PhoneSignScreen';
import PhoneConfirm from "../screens/Sign/PhoneConfirm/PhoneConfirm";
import InfoScreen from "../screens/Sign/Info/InfoScreen";
const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <>
            <Stack.Navigator initialRouteName="PhoneAuth" screenOptions={{
                headerShown: false,
                gestureEnabled: false
            }}>
                <Stack.Screen name="PhoneAuth" component={PhoneSignScreen} />
                <Stack.Screen name="PhoneConfirm" component={PhoneConfirm} />
                <Stack.Screen name="Info" component={InfoScreen} />
            </Stack.Navigator>
        </>
    )
}