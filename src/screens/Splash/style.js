import { StyleSheet } from "react-native";

import defColors from "../../helpers/defColors";
import scale from "../../helpers/scale";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: defColors.green,
    },
    logo: { height: '100%', width: '100%', tintColor: defColors.white },
    logoBox: {
        width: '60%', height: 60 / scale
    },
})