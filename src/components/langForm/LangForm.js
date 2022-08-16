import React, { useEffect } from "react";
import CountryFlag from "react-native-country-flag";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import scale from "../../helpers/scale";
import defColors from "../../helpers/defColors";

export default function LangForm({ name, code, fill, setLanguage }) {
    const width = useSharedValue('40%');

    useEffect(() => {
        width.value = withTiming('100%', { duration: 600 });
    }, [])

    const widthAnim = useAnimatedStyle(() => {
        return {
            width: width.value
        };
    }, []);
    const color = fill ? defColors.green : defColors.white;
    return (
        <View style={styles.section}>
            <Animated.View style={[styles.Animated, { borderColor: color }, widthAnim]}>
                <TouchableOpacity activeOpacity={0.7}
                    style={styles.container} onPress={setLanguage}>
                    <CountryFlag isoCode={code} style={styles.flag} />
                    <Text style={[styles.text, { color }]}>{name}</Text>
                </TouchableOpacity >
            </Animated.View>
        </View>
    )
}
const styles = StyleSheet.create({
    section: { width: '100%', alignItems: "center" },
    Animated: {
        height: 70 / scale,
        borderWidth: 1 / scale,
        borderRadius: 20 / scale,
        justifyContent: "center",
        backgroundColor: 'transparent',
    },
    container: {
        alignItems: "center",
        flexDirection: 'row',
        paddingHorizontal: 20 / scale,
    },
    flag: {
        height: 56 / scale,
        width: 56 / scale,
        borderRadius: 28 / scale
    },
    text: {
        fontWeight: '600',
        fontSize: 18 / scale,
        marginLeft: 20 / scale,
    }
})