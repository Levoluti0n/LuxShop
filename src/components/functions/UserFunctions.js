import AsyncStorage from "@react-native-async-storage/async-storage"
import auth from "@react-native-firebase/auth";
import ShowMessage from "../../helpers/toast";

export const updToken = async (token, cb) => {
    try {
        await AsyncStorage.setItem(
            '@token',
            token
        )
        cb && cb();
    } catch (error) {
        ShowMessage(error?.message);
    }
}

export const updUser = async (user, cb) => {
    const validUser = JSON.stringify(user);
    console.log(user);
    try {
        await AsyncStorage.setItem(
            '@user',
            validUser
        )
        console.log('setted');
        cb && cb();
    } catch (error) {
        ShowMessage(error?.message);
    }
}
export const rmUser = async (cb) => {
    try {
        await AsyncStorage.multiRemove(['@user', '@token']);
        cb && cb();
    } catch (error) {
        ShowMessage(error?.message);
    }
}

export const getUser = async (cb) => {
    return await AsyncStorage.getItem('@user').then(async (res) => {
        let token = await auth()?.currentUser?.getIdToken();
        token && await updToken(token);
        cb && cb(JSON.parse(res));
    }).catch(error => {
        ShowMessage(error?.message);
    })
}

