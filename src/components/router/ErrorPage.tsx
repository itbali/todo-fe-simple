import { Typography, Button, Stack } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useRouteError, useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError() as { statusText?: string; message?: string };
    const navigate = useNavigate();

    console.error(error); // Логируем ошибку для отладки

    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            spacing={2}
            sx={{ height: '100vh' }}
        >
            <ErrorOutline sx={{ fontSize: 100 }} color="error" />
            <Typography variant="h4" component="div">
                Произошла ошибка
            </Typography>
            <Typography variant="body1" component="div">
                {error.statusText || error.message || 'Неизвестная ошибка'}
            </Typography>
            <Button variant="contained" onClick={() => navigate(-1)}>
                Вернуться назад
            </Button>
        </Stack>
    );
};

export default ErrorPage;
