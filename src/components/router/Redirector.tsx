import {RootState, useAppDispatch} from "../../store";
import {useSelector} from "react-redux";
import {Outlet, useNavigate} from "react-router-dom";
import {ROUTES} from "./Routes.enum.ts";
import {setToken} from "../../store/authSlice.ts";
import {jwtDecode} from "jwt-decode"

export const Redirector = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.token);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    if (!isLoggedIn) {
        const token = localStorage.getItem('token');
        const { exp } = jwtDecode(token!);
        if (token && exp && exp * 1000 > Date.now()) {
            dispatch(setToken(token));
        } else {
            navigate(ROUTES.LOGIN);
        }
    }


    return <Outlet/>;
};