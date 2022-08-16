import React from "react";
import { View } from "react-native";

import scale from "../../helpers/scale";

export default function Separator({ width }) {

    return (
        <View style={{ height: width || 15 / scale, backgroundColor: 'transparent' }}>
        </View>
    )
}