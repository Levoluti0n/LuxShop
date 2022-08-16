import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import TypeWriter from 'react-native-typewriter';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from "../../context/AuthContext";
import { Text, View, Image, TouchableOpacity, StatusBar, ImageBackground } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
Feather.loadFont();

import defColors from "../../helpers/defColors";
import style from "./style";

export default function WelcomeScreen({ navigation, route }) {
    const { t } = useTranslation();
    const [typing, setTyping] = useState(1);
    const { setLanguage } = useContext(AuthContext);

    const scale = useSharedValue(0);
    const height = useSharedValue('3%');
    const progress = useSharedValue(-100);
    const rotate = useSharedValue('0deg');

    useEffect(() => {
        scale.value = withTiming(1, { duration: 500 });
        progress.value = withTiming(0, { duration: 500 });
        height.value = withTiming('20%', { duration: 500 });
    }, [])

    const heightAnim = useAnimatedStyle(() => {
        return {
            height: height.value,
        };
    }, []);

    const scaleAnim = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        };
    }, []);

    const progressAnim = useAnimatedStyle(() => {
        return {
            marginBottom: progress.value
        };
    }, []);

    const rotateAnim = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: rotate.value }]
        };
    }, []);

    const stopTyping = () => {
        if (typing) {
            setTyping(0);
            rotate.value = withTiming('360deg', { duration: 400 });
        }
    };

    return (
        <View style={[style.container, { backgroundColor: 'transparent' }]}>
            <ImageBackground blurRadius={0} source={require('../../assets/welcome/lightGreen.jpg')} resizeMode="cover" style={style.imageWelocme}>
                <StatusBar barStyle={'light-content'} backgroundColor={defColors.green} />
                <Animated.View style={[style.welcomeHeader, heightAnim]}>
                    <View style={style.navBar}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={style.chevronBox}>
                            <Feather name="chevron-left" size={35} color={defColors.white} />
                        </TouchableOpacity>
                        <View style={style.logoBox}>
                            <Image style={style.logo} source={require('../../assets/logo/LuxLogo.png')} resizeMode={'contain'} />
                        </View>
                        <View style={style.fakeView}></View>
                    </View>
                    <Text style={{ color: defColors.white, fontSize: 24, textAlign: "center" }}>{t('welcome:welcome')}</Text>
                    <View></View>
                </Animated.View>
                <Animated.View style={[style.textCont, scaleAnim]}>
                    <TouchableOpacity onPress={stopTyping} activeOpacity={0.8} style={style.textBox}>
                        {typing ? <TypeWriter style={style.typeText} typing={typing} minDelay={7} maxDelay={10} onTypingEnd={stopTyping} >{t('welcome:introduction')}</TypeWriter>
                            :
                            <Text style={style.typeText}>{t('welcome:introduction')}</Text>
                        }
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={[style.footer, progressAnim]}>
                    <Animated.View style={[style.checkView, rotateAnim]}>
                        <TouchableOpacity activeOpacity={0.3} onPress={typing ? stopTyping : () => setLanguage(route?.params?.language)} style={style.checkBox} >
                            <Feather name={typing ? "check" : "chevron-right"} size={40} color={defColors.white} />
                        </TouchableOpacity>
                    </Animated.View>
                </Animated.View>
            </ImageBackground >
        </View >
    )
}
