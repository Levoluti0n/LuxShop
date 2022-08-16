import React from "react";
import { ActivityIndicator, Image, StatusBar, View } from "react-native";

import defColors from "../../helpers/defColors";
import style from "./style";

export default function SplashScreen() {
    return (
        <View style={style.container}>
            <StatusBar backgroundColor={defColors.green} />
            <View style={style.logoBox}>
                <Image style={style.logo} source={require('../../assets/logo/LuxLogo.png')} resizeMode={'contain'} />
            </View>
            <ActivityIndicator size={25} color={defColors.white} />
        </View>
    )
}