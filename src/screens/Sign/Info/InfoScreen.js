import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, FlatList, Image, Keyboard, StatusBar, Text, TextInput, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { AuthContext } from "../../../context/AuthContext";
import Button from "../../../components/buttons/Button";
import defColors from "../../../helpers/defColors";
import Avatars from '../../../helpers/Avatars';
import ImageItem from "./ImageItem";
import style from "./style";
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
const Width = Dimensions.get('window').width;
const Card_Length = Width * 0.8;
const Spacing = Width * 0.04;

export default function SignScreen() {
    const height = Dimensions.get('window').height;
    const { UpdateUser } = useContext(AuthContext);
    const [warning, setWarning] = useState(false);
    const [loading, setLoading] = useState(false);
    const [username, setUserName] = useState('');
    const [footer, setFooter] = useState(true);
    const [scrollX, setScrollX] = useState(0);
    const [avatar, setAvatar] = useState('');
    const h = useSharedValue(-height);
    const scale = useSharedValue(0);
    const { t } = useTranslation();

    useEffect(() => {
        h.value = withTiming(-height * 0.6, { duration: 400 });
        scale.value = withTiming(1, { duration: 600 });
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setFooter(false);
                h.value = withTiming(-height * 0.75, { duration: 200 })
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setFooter(true);
                h.value = withTiming(-height * 0.6, { duration: 200 })
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, [])

    useEffect(() => {
        if (username.length && username.length < 3) {
            setWarning(true);
        } else {
            setWarning(false);
        }
    }, [username])

    const hAnim = useAnimatedStyle(() => {
        return {
            top: h.value
        }
    }, [])

    const scaleAnim = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        }
    }, [])

    const setUser = () => {
        setLoading(true);
        UpdateUser({ displayName: username }, () => setLoading(false));
    }

    return (
        <View style={style.container}>
            <StatusBar backgroundColor={defColors.greenBack} />
            <Animated.View style={[style.splash, hAnim, { height: height, width: height, left: -height * 0.2 }]}></Animated.View>
            <View style={style.header}>
                <Animated.View style={[style.headerBox, scaleAnim]}>
                    <Image style={style.logo} source={require('../../../assets/logo/LuxLogo.png')} resizeMode={'contain'} />
                </Animated.View>
                <View style={style.iconBox}>
                    <Image source={require('../../../assets/welcome/auth.png')} style={style.authIcon} />
                </View>
            </View>
            <TextInput onChangeText={setUserName} placeholderTextColor={defColors.greenBack} maxLength={12} style={style.textInput} placeholder={`${t('sign:username')}...`} />
            {warning && <Text style={style.warning}>{t('errors:sign:validName')}</Text>}
            {footer && <View style={style.avaBox}>
                <View style={style.titleBox}>
                    <Text style={style.title}>{t('sign:avatar')}</Text>
                </View>
                <Animated.View>
                    <AnimatedFlatList
                        scrollEventThrottle={10}
                        decelerationRate={0.8}
                        snapToInterval={Card_Length + (Spacing * 1.5)}
                        disableIntervalMomentum
                        disableScrollViewPanResponder
                        snapToAlignment={'center'}
                        horizontal
                        data={Avatars}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return <ImageItem name={item.name} fbPath={item.fbPath} path={item.path} fillName={avatar.name} index={index} scrollX={scrollX} setAvatar={setAvatar} />
                        }}
                        onScroll={(event) => {
                            setScrollX(event.nativeEvent.contentOffset.x);
                        }}
                    />
                    <Animated.View style={[style.btnBox, scaleAnim]}>
                        <Button loading={loading} onPress={setUser} disabled={username.length < 3 || !avatar?.fbPath || loading} label={`${t('sign:choose')} ${avatar?.name ? `'${t(`avatars:${avatar.name}`)}'` : ''}`} containerStyle={[style.btn, { backgroundColor: username.length < 3 || !avatar?.fbPath ? defColors.rgbablack : defColors.greenBack }]} />
                    </Animated.View>
                </Animated.View>
            </View>}
        </View>
    )
}