import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "./utils/consts";

export const authRoutes = [
    {
        path: HOME_ROUTE,
        Component: <HomePage />
    }
]

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: <HomePage />
    },
    {
        path: LOGIN_ROUTE,
        Component: <LoginPage />
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <RegistrationPage />
    }
]