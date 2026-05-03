import { useDispatch } from "react-redux";
import { setAuthLoading, setUser } from "../state/auth.slice";
import { authApi } from "../services/auth.api";
import toast from "react-hot-toast";

export const useAuth = () => {
    const dispatch = useDispatch();

    const handleRegister = async (userData) => {
        try {
            dispatch(setAuthLoading(true));
            const response = await authApi.register(userData);
            toast.success(response.message || "Account created successfully!");
            return response;
        } catch (error) {
            toast.error(error.message || "Registration failed");
            return Promise.reject(error);
        } finally {
            dispatch(setAuthLoading(false));
        }
    };

    const loginHandler = async (userData) => {
        try {
            dispatch(setAuthLoading(true));
            const response = await authApi.login(userData);
            dispatch(setUser(response.data.user));
            toast.success(response.message || "Successfully signed in!");
            return response;
        } catch (error) {
            toast.error(error.message || "Authentication failed");
            return error;
        } finally {
            dispatch(setAuthLoading(false));
        }
    };

    const logoutHandler = async () => {
        try {
            dispatch(setAuthLoading(true));
            const response = await authApi.logout();
            dispatch(setUser(null));
            toast.success(response.message || "Logged out successfully");
            return response;
        } catch (error) {
            toast.error(error.message || "Logout failed");
            dispatch(setUser(null));
            return error;
        } finally {
            dispatch(setAuthLoading(false));
        }
    };

    const getCurrentUser = async () => {
        try {
            dispatch(setAuthLoading(true));
            const response = await authApi.getCurrentUser();
            dispatch(setUser(response.data.user));
            return response;
        } catch (error) {
            console.log("Current user check failed:", error.message);
            return error;
        } finally {
            dispatch(setAuthLoading(false));
        }
    };


    const handleVerifyAccount = async (token) => {
        try {
            dispatch(setAuthLoading(true));
            const response = await authApi.verifyAccount(token);
            toast.success(response.message || "Account verified successfully!");
            return response;
        } catch (error) {
            toast.error(error.message || "Account verification failed");
            return error;
        } finally {
            dispatch(setAuthLoading(false));
        }
    };

    return { handleRegister, loginHandler, logoutHandler, getCurrentUser, handleVerifyAccount };
};
