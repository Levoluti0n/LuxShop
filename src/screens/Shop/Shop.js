import React, { useContext, useEffect, useState } from "react";
import { StatusBar, Text, View } from "react-native";
import auth from "@react-native-firebase/auth";

import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import { useTheme } from "react-native-paper";
import Button from "../../components/buttons/Button";

export default function Home() {
    const { toggleTheme } = useContext(ThemeContext);
    const { SignOut, user, confirm } = useContext(AuthContext);
    const [isDark, setDark] = useState(false);
    const [loading, setLoading] = useState(false);
    const { colors } = useTheme();

    async function signout() {
        await SignOut(() => setLoading(false));
        // console.log(await auth().currentUser.getIdToken())
    }
    useEffect(() => {
        // console.log(auth().currentUser);
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>

            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
            <Button label={'SignOut'} loading={loading} onPress={signout} />
            {/* <Button
                title="Log CurrentUser"
                onPress={() => console.log(auth().currentUser)}
            />
            <Button title={'Change Theme'} onPress={() => {
                setDark(!isDark);
                toggleTheme(!isDark)
            }} /> */}
            {/* <Text style={{ color: 'black' }}>{user.displayName}</Text> */}
        </View>
    )
}