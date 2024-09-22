import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Button, Container, IconButton, InputAdornment, TextField} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {login} from '../store/authSlice';
import {RootState, useAppDispatch} from '../store';
import {useAuthControllerRegisterMutation} from "../rtkApi/todoApi.ts";
import {enqueueSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "./router/Routes.enum.ts";

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useAppDispatch();
    const authStatus = useSelector((state: RootState) => state.auth.status);
    const authError = useSelector((state: RootState) => state.auth.error);
    const isLoggedIn = useSelector((state: RootState) => state.auth.token);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        dispatch(login({username, password}));
    };
    const [register, {error, isLoading}] = useAuthControllerRegisterMutation();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleRegister = async () => {
        register({authDto: {username, password}});
    }

    useEffect(() => {
        if (isLoggedIn) {
            enqueueSnackbar('Вы успешно авторизовались', {variant: 'success'});
            navigate(ROUTES.ROOT);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(JSON.stringify(error), {variant: 'error'});
        }
    }, [error]);

    return (
        <Container maxWidth="sm">
            <div>
                <TextField
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={authStatus === 'loading' || isLoading}
                    onClick={handleSubmit}
                >
                    {authStatus === 'loading' ? 'Logging in...' : 'Login'}
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={authStatus === 'loading' || isLoading}
                    onClick={handleRegister}
                >
                    {isLoading ? 'Registering...' : 'Register'}
                </Button>
                {authError && <p style={{color: 'red'}}>{authError}</p>}
            </div>
        </Container>
    );
};

export default LoginForm;
