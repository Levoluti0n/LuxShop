import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Animated from 'react-native-reanimated';

import defColors from '../../helpers/defColors';
import scale from '../../helpers/scale';

const style = StyleSheet.create({
  animView: {
    width: 0,
    borderRadius: 12 / scale,
    backgroundColor: defColors.green,
  },
  container: {
    paddingTop: 13 / scale,
    borderRadius: 12 / scale,
    paddingBottom: 13 / scale,
    backgroundColor: defColors.green,
  },
  animCont: {
    paddingTop: 13 / scale,
    paddingBottom: 13 / scale,
  },
  label: {
    fontWeight: '500',
    textAlign: 'center',
    fontStyle: 'normal',
    fontSize: 18 / scale,
    lineHeight: 20 / scale,
    color: defColors.white,
  },
});

const Button = ({
  label,
  btnAnim,
  onPress,
  loading,
  disabled,
  animStyle,
  labelStyle,
  loadingColor,
  activeOpacity,
  containerStyle,
}) =>
  btnAnim ?
    <Animated.View style={[style.animView, animStyle, btnAnim]}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || false}
        activeOpacity={activeOpacity || 0.7}
        style={[style.animCont, containerStyle]}>
        {loading ? (
          <ActivityIndicator size={'small'} color={loadingColor || defColors.white} />
        ) : (
          <Text style={[style.label, labelStyle]}>{label}</Text>
        )}
      </TouchableOpacity>
    </Animated.View>
    :
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || false}
      activeOpacity={activeOpacity || 0.7}
      style={[style.container, containerStyle]}>
      {loading ? (
        <ActivityIndicator size={'small'} />
      ) : (
        <Text style={[style.label, labelStyle]}>{label}</Text>
      )}
    </TouchableOpacity>


export default Button;
