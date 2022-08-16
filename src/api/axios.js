import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import config from './config';

export const $api = axios.create({
    withCredentials: true,
    baseURL: config.baseUrl,
});

$api.interceptors.request.use(async config => {
    const token = await AsyncStorage.getItem('@token');
    config.headers.authorization = `Bearer ${token}`;
    return config;
});
