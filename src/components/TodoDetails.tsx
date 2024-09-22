import { useParams, useNavigate } from 'react-router-dom';
import {useTodoControllerFindByIdQuery} from '../rtkApi/todoApi.ts';
import {
    Breadcrumbs,
    Link,
    Typography,
    Stack,
    IconButton,
    Box,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import {enqueueSnackbar} from "notistack";
import Loader from "./Loader.tsx";
import {Todo} from "../store/todosSlice.ts";
import {ROUTES} from "./router/Routes.enum.ts";

const TodoDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Запрос данных задачи по ID
    const { data: todoData, isLoading, isError } = useTodoControllerFindByIdQuery({ id: id! });

    const todo = todoData as Todo;


    if (isLoading) {
        return (
            <Loader isPresent={true} />
        );
    }

    if (isError || !todo) {
        enqueueSnackbar('Ошибка загрузки данных', {variant: 'error'});
        return (
            <Box display="flex" justifyContent="center" mt={5}>
                <Typography variant="h6">Ошибка загрузки данных</Typography>
            </Box>
        );
    }

    return (
        <Stack spacing={2} sx={{ p: 2 }}>
            {/* Стрелка назад и хлебные крошки */}
            <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBack />
                </IconButton>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link sx={{cursor: 'pointer'}} underline="hover" color="inherit" onClick={() => navigate(ROUTES.ROOT)}>
                        Список задач
                    </Link>
                    <Typography color="text.primary">{todo.title}</Typography>
                </Breadcrumbs>
            </Stack>

            {/* Заголовок задачи */}
            <Typography variant="h4">{todo.title}</Typography>

            {/* Описание задачи */}
            <Typography variant="body1">{todo.description}</Typography>

            {/* Статус задачи */}
            <Typography variant="subtitle1" color="text.secondary">
                Статус: {todo.completed ? 'Выполнено' : 'Не выполнено'}
            </Typography>

            {/* Дата создания */}
            <Typography variant="subtitle2" color="text.secondary">
                Создано: {new Date(todo.createdAt).toLocaleString('ru-RU')}
            </Typography>

            {/* Дата обновления */}
            <Typography variant="subtitle2" color="text.secondary">
                Обновлено: {new Date(todo.updatedAt).toLocaleString('ru-RU')}
            </Typography>
        </Stack>
    );
};

export default TodoDetails;
