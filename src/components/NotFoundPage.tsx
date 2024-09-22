import { Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {SentimentVeryDissatisfied} from "@mui/icons-material";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            spacing={2}
            sx={{ height: '100vh' }}
        >
            <SentimentVeryDissatisfied sx={{ fontSize: 100 }} color="error" />
            <Typography variant="h1" component="div">
                404
            </Typography>
            <Typography variant="h5" component="div">
                Страница не найдена
            </Typography>
            <Button variant="contained" onClick={() => navigate('/')}>
                Вернуться на главную
            </Button>
        </Stack>
    );
};

export default NotFound;
