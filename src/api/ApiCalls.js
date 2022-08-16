import { $api } from "./axios";

export const Update = async (obj) => {
    return await $api.post('user/update', { updatedUser: { ...obj } });
}