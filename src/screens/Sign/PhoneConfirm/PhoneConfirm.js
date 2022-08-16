import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Keyboard, StatusBar, Text, View } from "react-native";
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import style from "./style";
import auth from "@react-native-firebase/auth";
import ShowMessage from "../../../helpers/toast";
import defColors from "../../../helpers/defColors";
import Button from "../../../components/buttons/Button";
import { AuthContext } from "../../../context/AuthContext";

export default function PhoneConfirm({ navigation }) {
    const { confirm, verifyUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const height = useSharedValue("0%");
    const [otp, setOtp] = useState('');
    const scale = useSharedValue(0);
    const { t } = useTranslation();

    function onAuthStateChanged(user) {
        if (user) {
            console.log(user);
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

        scale.value = withTiming(1, { duration: 650 });
        height.value = withTiming('70%', { duration: 600 });

        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                scale.value = withTiming(0.5, { duration: 300 })
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                scale.value = withTiming(1, { duration: 300 })
            }
        );

        return () => {
            subscriber;
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, [])

    const heightAnim = useAnimatedStyle(() => {
        return {
            height: height.value
        }
    }, [])

    const scaleAnim = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        }
    }, [])

    const Confirm = () => {
        setLoading(true);
        confirm.confirm(otp).then(async res => {
            const idToken = await res.user.getIdToken();
            await verifyUser(idToken, () => setLoading(false), navigation);
        }).catch(err => {
            ShowMessage(err.message);
            setLoading(false);
        })
    }

    return (
        <View style={style.container}>
            <StatusBar backgroundColor={defColors.greenBack} />
            <View style={style.header}>
                <Animated.View style={[style.headerBox, scaleAnim]}>
                    <Image style={style.logo} source={require('../../../assets/logo/LuxLogo.png')} resizeMode={'contain'} />
                    <Text style={style.title}>{t('sign:verifyTitle')}</Text>
                </Animated.View>
            </View>
            <Animated.View style={[style.sheet, heightAnim]}>
                <View style={style.line}></View>
                <View style={style.otpBox}>
                    <OTPInputView
                        code={otp}
                        pinCount={6}
                        style={style.otpInput}
                        onCodeChanged={setOtp}
                        codeInputFieldStyle={style.codeField}
                        selectionColor={defColors.rgbawhite}
                    />
                    <Button disabled={otp.length !== 6 || loading} containerStyle={style.Verify} loading={loading} label={t('sign:verify')} onPress={Confirm} />
                </View>
            </Animated.View>
        </View>
    )
}

