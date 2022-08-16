import { StyleSheet } from "react-native";

import scale from '../../helpers/scale';
import defColors from '../../helpers/defColors';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: '100%',
        justifyContent: "space-between",
    },
    imageWelocme: {
        width: '100%',
        height: '100%',
    },
    imageBox: {
        width: '100%',
        alignItems: 'center',
        marginTop: 80 / scale,
    },
    imageBorder: {
        width: '80%',
        height: 230 / scale,
        borderRadius: 13 / scale,
        paddingVertical: 20 / scale,
        backgroundColor: '#00000059',
    },
    welcomeFooter: {
        height: '50%',
        paddingTop: 10 / scale,
        paddingHorizontal: 15 / scale,
        borderTopEndRadius: 35 / scale,
        borderTopStartRadius: 35 / scale,
        backgroundColor: defColors.rgbablack,
    },
    language: {
        fontWeight: '600',
        textAlign: "center",
        fontSize: 25 / scale,
        color: defColors.white,
        marginBottom: 20 / scale,
    },
    langBox: {
        marginBottom: 30 / scale
    },
    btnBox: {
        alignItems: "center"
    },
    welcomeHeader: {
        alignItems: "center",
        paddingTop: 5 / scale,
        paddingHorizontal: 20 / scale,
        justifyContent: "space-around",
        backgroundColor: defColors.green,
        borderBottomEndRadius: 80 / scale,
        borderBottomStartRadius: 80 / scale,
    },
    navBar: {
        width: '100%',
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    chevronBox: {
        padding: 3 / scale,
    },
    fakeView: { width: 41 / scale },
    textCont: {
        flex: 1,
        padding: 35 / scale,
        justifyContent: "center",
    },
    textBox: {
        borderWidth: 1 / scale,
        borderColor: '#27FF6FFF',
        borderRadius: 20 / scale,
        paddingVertical: 20 / scale,
        paddingHorizontal: 20 / scale,
        backgroundColor: defColors.rgbablack,
    },
    typeText: {
        fontSize: 16 / scale,
        color: defColors.white,
        textAlign: "center",
    },
    checkView: {
        borderRadius: 60 / 2,
    },
    checkBox: {
        padding: 10 / scale,
        borderRadius: 60 / 2,
        backgroundColor: defColors.green,
    },
    footer: { flexDirection: 'row', justifyContent: "flex-end", paddingHorizontal: 40 / scale, paddingBottom: 30 / scale },
    logo: { height: '100%', width: '100%', tintColor: defColors.white },
    logoBox: { width: '60%', height: 50 / scale },
});