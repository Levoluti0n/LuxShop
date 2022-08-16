import { StyleSheet } from "react-native";

import defColors from '../../../helpers/defColors';
import scale from '../../../helpers/scale';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: defColors.softGray
    },
    splash: {
        position: "absolute",
        borderRadius: 90 / scale,
        transform: [{ rotate: '35deg' }],
        backgroundColor: defColors.greenBack,
    },
    headerBox: {
        width: '72%',
        height: 140 / scale,
        alignSelf: "center",
        marginTop: 20 / scale
    },
    logo: {
        width: '100%',
        height: '80%',
        tintColor: defColors.white,
    },
    authIcon: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
        tintColor: defColors.rgbawhite
    },
    iconBox: {
        width: '50%',
        height: '60%',
        alignSelf: "flex-end",
    },
    header: {
        height: '50%',
    },
    textInput: {
        width: '50%',
        fontSize: 17 / scale,
        color: defColors.greenBack,
        paddingVertical: 2 / scale,
        paddingHorizontal: 20 / scale,
        borderBottomWidth: 0.7 / scale,
        borderBottomColor: defColors.greenBack,
    },
    warning: {
        fontSize: 13 / scale,
        color: defColors.red,
        marginLeft: 20 / scale,
    },
    avaBox: {
        marginTop: '18%',
        borderTopWidth: 1 / scale,
        borderTopColor: defColors.greenBack
    },
    titleBox: {
        alignSelf: 'flex-end',
        marginTop: -20 / scale,
        marginRight: 55 / scale,
        paddingHorizontal: 10 / scale,
        backgroundColor: defColors.softGray,
    },
    title: {
        fontSize: 24 / scale,
        color: defColors.greenBack
    },
    btnBox: {
        paddingHorizontal: 30 / scale
    },
    btn: {
        marginTop: 10 / scale,
        borderRadius: 30 / scale,
    }
});