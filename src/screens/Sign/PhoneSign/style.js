import { StyleSheet } from "react-native";

import defColors from "../../../helpers/defColors";
import scale from "../../../helpers/scale";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: defColors.greenBack
    },
    header: {
        alignItems: "center",
        borderTopWidth: 1 / scale,
        borderTopColor: defColors.softGray,
    },
    logoBox: {
        zIndex: 1,
        width: '58%',
        height: 80 / scale,
        marginTop: -50 / scale,
        paddingHorizontal: 7 / scale,
        backgroundColor: defColors.greenBack,
    },
    phoneInput: {
        width: '80%',
        height: 55 / scale,
        flexDirection: 'row',
        alignItems: "center",
        borderRadius: 15 / scale,
        // paddingVertical: 5 / scale,
        justifyContent: "space-between",
        backgroundColor: defColors.rgbawhite,
    },
    logo: {
        width: '100%',
        height: '100%',
        tintColor: defColors.white
    },
    phoneCont: {
        alignItems: "center",
        marginTop: 60 / scale,
    },
    flagBox: {
        width: '25%',
        height: '100%',
        alignItems: "center",
        justifyContent: 'center',
        borderRightWidth: 0.6 / scale,
        borderRightColor: defColors.hardGray
    },
    flag: {
        width: 40 / scale,
        height: 28 / scale,
        borderRadius: 5 / scale
    },
    input: {
        width: '75%',
        height: '100%',
        flexDirection: 'row',
        alignItems: "center",
        paddingHorizontal: 15 / scale,
        justifyContent: "space-between",
    },
    inpLeft: {
        flexDirection: 'row',
        alignItems: "center",
    },
    nums: {
        fontWeight: '600',
        fontSize: 18 / scale,
        color: defColors.hardGray,
    },
    pad: {
        height: '100%',
        fontSize: 17 / scale,
        color: defColors.hardGray,
        paddingHorizontal: 10 / scale,
    },
    submit: {
        marginTop: 20 / scale,
        borderRadius: 60 / scale,
        backgroundColor: 'transparent',
    },
    title: {
        fontSize: 20 / scale,
        marginTop: 20 / scale,
        color: defColors.white
    },
})