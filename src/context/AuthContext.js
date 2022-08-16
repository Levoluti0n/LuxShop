import React, { createContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import i18next from 'i18next';

import { getUser, rmUser, updToken, updUser } from '../components/functions/UserFunctions';
import { getLanguage, updateLanguage } from '../components/functions/LangFunctions';
import ShowMessage from '../helpers/toast';
import { Update } from '../api/ApiCalls';
import config from '../api/config';
import axios from 'axios';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // const [token, setToken] = useState(null);
    const [language, setLanguage] = useState();
    const [confirm, setConfirm] = useState(null);
    const [loading, setLoading] = useState(true);

    const getLanguageCb = (res) => {
        i18next.changeLanguage(res?.code);
        setLanguage(res);
    }

    useEffect(() => {
        // auth().signOut()
        setTimeout(() => {
            setLoading(false)
        }, 2000);
        getUser(setUser);
        getLanguage(getLanguageCb);
    }, [])

    const sendVerificationCode = (phoneNumber, cb, navigation) => {
        auth()
            .signInWithPhoneNumber(phoneNumber)
            .then(confirmationResult => {
                confirmationResult && setConfirm(confirmationResult)
                if (navigation && confirmationResult) {
                    cb && cb();
                    return navigation.push('PhoneConfirm', { phoneNumber });
                }
            }).catch(
                err => {
                    ShowMessage(err.message);
                    cb && cb();
                },
            );
    };

    const verifyUser = async (token, cb, navigation) => {
        return await axios.get(`${config.baseUrl}/user/verify`, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }).then(async res => {
            if (res?.data?.success) {
                updToken(token);
                cb && cb();
                if (res?.data?.isSigned) {
                    return await updUser(res.data.user, () => setUser(res.data.user));
                }
                return navigation.push('Info', { token })
            }
            ShowMessage(res?.data?.message);
        }).catch(e => ShowMessage(e.message))
    };

    const UpdateUser = async (obj, cb) => {
        await Update(obj).then(async res => {
            if (res?.data?.success) {
                ShowMessage(res.data.message);
                return await updUser(res.data.user, () => setUser(res.data.user));
            }
        }).catch(e => {
            ShowMessage(e.message)
        })
        cb && cb()
    };

    const SignOut = async (cb) => {
        await auth().signOut();
        cb && cb()
        await rmUser(() => {
            setUser(null)
        })
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                confirm,
                loading,
                SignOut,
                setUser,
                language,
                UpdateUser,
                verifyUser,
                setLanguage,
                updateLanguage,
                sendVerificationCode
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
