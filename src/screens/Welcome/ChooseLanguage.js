import i18next from 'i18next';
import React, { useContext, useEffect, useState } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Image, ImageBackground, StatusBar, Text, TouchableOpacity, View, FlatList } from "react-native";

import style from './style';
import ShowMessage from '../../helpers/toast';
import defColors from '../../helpers/defColors';
import Button from "../../components/buttons/Button";
import { AuthContext } from '../../context/AuthContext';
import LangForm from "../../components/langForm/LangForm";
import Separator from "../../components/separator/separator";


export default function ChooseLanguage({ navigation }) {
    const scale = useSharedValue(0);
    const width = useSharedValue('40%');
    const [language, setLanguage] = useState();
    const { updateLanguage } = useContext(AuthContext);

    const languages = [{ code: 'am', lang: 'Հայերեն', i18: 'am' }, { code: 'ru', lang: 'Русский', i18: 'ru' }, { code: 'gb', lang: 'English', i18: 'en' }];

    useEffect(() => {
        scale.value = withTiming(1, { duration: 600 });
    }, [])

    const scaleAnim = useAnimatedStyle(() => {
        return {
            transform: [{ rotateZ: '-8deg' }, { rotateY: '20deg' }, { rotateX: '20deg' }, { scale: scale.value }]
        };
    }, []);

    const widthAnim = useAnimatedStyle(() => {
        return {
            width: width.value
        };
    }, []);

    const onLanguagePress = (item) => {
        setLanguage({ code: item.i18, language: item.lang });
        if (width.value !== '100%') {
            width.value = withTiming('100%', { duration: 400 });
        }
    }

    const onSelectPress = async () => {
        i18next.changeLanguage(language.code);
        await updateLanguage(language).then(res =>
            res.code ? navigation.push('Welcome', { language }) : ShowMessage(res)
        )
    }

    return (
        <View style={style.container}>
            <StatusBar barStyle={'light-content'} backgroundColor={defColors.hardGray} />
            <ImageBackground blurRadius={2.5} source={require('../../assets/welcome/artsakh.png')} resizeMode="cover" style={style.image}>
                <Animated.View style={[scaleAnim, style.imageBox]}>
                    <TouchableOpacity activeOpacity={0.5} style={style.imageBorder}>
                        <Image style={style.image} resizeMode='contain' source={require('../../assets/welcome/delivery.png')} />
                    </TouchableOpacity>
                </Animated.View>
                <View style={style.welcomeFooter}>
                    <Text style={style.language}>Language</Text>
                    <View style={style.langBox}>
                        <FlatList
                            data={languages}
                            ItemSeparatorComponent={Separator}
                            keyExtractor={(item, i) => i.toString()}
                            renderItem={({ item }) => {
                                return <LangForm code={item.code} name={item.lang} fill={language?.code === item?.i18} setLanguage={() => onLanguagePress(item)} />
                            }}
                        /></View>
                    <View style={style.btnBox}>
                        {language?.language && <Button btnAnim={widthAnim} activeOpacity={0.5} disabled={!language.code} label={`Select ${language.language}`} onPress={onSelectPress} />}
                    </View>
                </View>
            </ImageBackground >
        </View >
    )
}