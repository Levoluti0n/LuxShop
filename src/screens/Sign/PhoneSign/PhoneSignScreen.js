import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CountryFlag from 'react-native-country-flag';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput, Image, StatusBar, TouchableOpacity, View, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
Icon.loadFont();

import style from './style';
import ShowMessage from '../../../helpers/toast';
import defColors from '../../../helpers/defColors';
import Button from '../../../components/buttons/Button';
import { AuthContext } from '../../../context/AuthContext';

export default function PhoneSignScreen({ navigation }) {
  const { sendVerificationCode } = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [label, setLabel] = useState('');
  const mbottom = useSharedValue('10%');
  const mtop = useSharedValue(-40);
  const scale = useSharedValue(0);
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      setLabel(t('sign:send'));
    }, 300)
    scale.value = withTiming(1, { duration: 500 });
    mtop.value = withTiming(120, { duration: 500 });
    mbottom.value = withTiming('78%', { duration: 500 });
  }, [])

  useEffect(() => {
    let formattedText = phoneNumber.split(' ').join('');
    if (formattedText.length > 0) {
      formattedText = formattedText.match(new RegExp('.{1,2}', 'g')).join(' ');
      setPhoneNumber(formattedText);
    }
  }, [phoneNumber])

  const scaleAnim = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    }
  }, [])

  const mtopAnim = useAnimatedStyle(() => {
    return {
      marginTop: mtop.value
    }
  }, [])

  const mbottomAnim = useAnimatedStyle(() => {
    return {
      width: mbottom.value
    }
  }, [])

  const Confirm = () => {
    let number = phoneNumber.replace(/\s/g, '');
    if (typeof (+number) === 'number') {
      setLoading(true);
      sendVerificationCode('+374' + number, () => setLoading(false), navigation);
    } else {
      ShowMessage(t('errors:sign:validnum'))
    }
  }

  return (
    <View style={style.container}>
      <StatusBar backgroundColor={defColors.greenBack} />
      <Animated.View style={[style.header, mtopAnim]}>
        <View style={style.logoBox}>
          <Image style={style.logo} source={require('../../../assets/logo/LuxLogo.png')} resizeMode={'contain'} />
        </View>
        <Text style={style.title}>{t('sign:phone')}</Text>
      </Animated.View>
      <View style={style.phoneCont}>
        <Animated.View style={[style.phoneInput, scaleAnim]}>
          <TouchableOpacity activeOpacity={0.6} style={style.flagBox}>
            <CountryFlag isoCode={'am'} style={style.flag} />
          </TouchableOpacity>
          <View style={style.input}>
            <View style={style.inpLeft}>
              <Text style={style.nums}>+374</Text>
              <TextInput disabled={isLoading} textContentType={'telephoneNumber'} placeholderTextColor={defColors.rgbablack} selectionColor={defColors.rgbablack} value={phoneNumber} onChangeText={setPhoneNumber} keyboardType={'number-pad'} placeholder={'XX XX XX XX'} style={style.pad} maxLength={11} />
            </View>
            <Icon color={phoneNumber.length !== 11 ? defColors.rgbablack : defColors.rgbawhite} name={'phone-portrait-outline'} size={24} />
          </View>
        </Animated.View>
        <Button loading={isLoading} activeOpacity={0.4} btnAnim={mbottomAnim} disabled={isLoading || phoneNumber.length !== 11} label={label} containerStyle={{ backgroundColor: phoneNumber.length !== 11 ? defColors.rgbablack : defColors.rgbawhite, borderRadius: 60 }} animStyle={style.submit} onPress={Confirm} />
      </View>
    </View>
  )
}