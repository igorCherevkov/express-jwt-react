import { login as apiLogin, registration as apiRegistration } from "./users";

export const loginSuccess = (JWTtoken, user) => ({
    type: 'LOGIN_SUCCESS',
    payload: { JWTtoken, user }
});

export const loginFailure = (error) => ({
    type: 'LOGIN_FAILURE',
    payload: error
});

export const logout = () => ({
    type: 'LOGOUT'
});

export const login = (username, password) => async (dispatch) => {
    try {
        const res = await apiLogin(username, password);
        const data = res.data;
        localStorage.setItem('JWTtoken', data.JWTtoken);
        dispatch(loginSuccess(data.JWTtoken, data.user));
    } catch (e) {
        dispatch(loginFailure(error.message));
    }
};

export const registration = (username, password) => async (dispatch) => {
    try {
        await apiRegistration(username, password);
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};

export const performLogout = () => (dispatch) => {
    localStorage.removeItem('JWTtoken');
    dispatch(logout());
};