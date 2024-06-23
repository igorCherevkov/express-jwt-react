import { $host } from ".";

export const login = async (username, password) => {
    const res = await $host.post('/user/login', {
        username: username,
        password: password
    });
    return res;
};

export const registration = async (username, password) => {
    await $host.post('/user/registration', {
        username: username,
        password: password
    });
};