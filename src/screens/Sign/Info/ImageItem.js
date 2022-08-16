import React, { useEffect } from "react";
import { Image, TouchableOpacity, StyleSheet, Dimensions, View } from "react-native";
import Animated, { interpolate, useSharedValue, Extrapolate, useAnimatedStyle, withTiming } from "react-native-reanimated";
import Icon from "react-native-vector-icons/Ionicons";
import defColors from "../../../helpers/defColors";

import scale from "../../../helpers/scale";
const Width = Dimensions.get('window').width;
const SideCard_Length = (Width * 0.16) / 2;
const Card_Length = Width * 0.8;
const Spacing = Width * 0.004;

export default function ImageItem({ name, path, fbPath, index, scrollX, setAvatar, fillName }) {
    const size = useSharedValue(0.8);
    const scale = useSharedValue(0);

    useEffect(() => {
        scale.value = withTiming(index ? 0.7 : 1, { duration: 600 })
    }, [])

    const inputRange = [
        (index - 1) * Card_Length,
        index * Card_Length,
        (index + 1) * Card_Length
    ]
    size.value = interpolate(
        scrollX,
        inputRange,
        [0.7, 1, 0.7],
        Extrapolate.CLAMP
    )

    const cardStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scaleY: size.value }]
        }
    })

    const cardScale = useAnimatedStyle(() => {
        return {
            transform: [{ scaleY: scale.value }]
        }
    })

    return (
        <Animated.View style={[styles.imgBox, cardScale, cardStyle, { marginLeft: index === 0 ? SideCard_Length : Spacing, marginRight: index === 2 ? SideCard_Length : Spacing }]}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => setAvatar({ path, name, fbPath })}>
                <View style={styles.checkBox}>
                    <Icon name={fillName === name ? "checkmark-done" : "ios-checkmark"} size={20} color={fillName === name ? defColors.green : defColors.hardGray} />
                </View>
                <Image style={styles.img} source={path} resizeMode={'contain'} />
            </TouchableOpacity>
        </Animated.View >
    )
}

const styles = StyleSheet.create({
    imgBox: {
        overflow: 'hidden',
        width: Card_Length,
        height: 170 / scale,
        borderRadius: 15 / scale,
        paddingVertical: 10 / scale,
        backgroundColor: '#00AB9B33',
    },
    img: {
        width: '100%',
        height: '85%'
    },
    checkBox: { height: '15%', paddingHorizontal: 10 / scale }
})