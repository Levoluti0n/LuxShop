import AsyncStorage from "@react-native-async-storage/async-storage";

export async function updateLanguage(langObj) {
    try {
        const currentLanguage = JSON.stringify(langObj);
        await AsyncStorage.setItem(
            'language',
            currentLanguage
        )
        return langObj;
    } catch (error) {
        return error;
    }
}

export async function getLanguage(cb, loading) {
    await AsyncStorage.getItem('language').then((res) => {
        return res && cb && cb(JSON.parse(res));
    }).catch(e => {
        ShowMessage(e?.message);
    })
    loading && loading(false);
}