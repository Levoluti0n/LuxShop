import { StyleSheet } from "react-native";

import defColors from "../../../helpers/defColors";
import scale from "../../../helpers/scale";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: defColors.greenBack,
    },
    header: {
        height: "25%",
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: '100%',
        height: '80%',
        tintColor: defColors.white,
    },
    sheet: {
        alignItems: "center",
        paddingHorizontal: 40 / scale,
        borderTopEndRadius: 50 / scale,
        borderTopStartRadius: 50 / scale,
        backgroundColor: defColors.rgbawhite,
    },
    title: {
        textAlign: "center",
        fontSize: 22 / scale,
        color: defColors.white,
    },
    headerBox: {
        width: '72%',
        height: 140 / scale,
        alignItems: "center",
        justifyContent: "space-between",
    },
    otpInput: {
        width: '100%',
        height: '50%',
    },
    otpBox: {
        height: '40%',
        justifyContent: "flex-end"
    },
    line: {
        width: '30%',
        height: 5 / scale,
        backgroundColor: 'red',
        marginTop: -14 / scale,
        backgroundColor: defColors.softGray,
        borderRadius: 7 / 2 / scale,
    },
    Verify: {
        backgroundColor: defColors.greenBack
    },
    codeField: {
        borderRadius: 10 / scale
    }
});