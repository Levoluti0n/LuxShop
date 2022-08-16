import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from "./TabNavigator";
const Stack = createStackNavigator();

export default function AppStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            presentation: 'modal',
        }} initialRouteName="Tabs">
            <Stack.Screen name={'Tabs'} component={TabNavigator} />
            {/* <Stack.Screen name="Modal" component={Modal} /> */}
        </Stack.Navigator>
    )
}