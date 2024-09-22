import {Checkbox, Icon, Link, ListItem, ListItemText, Stack, TextField} from "@mui/material";
import {Todo} from "../store/todosSlice.ts";
import {useTodoControllerDeleteMutation, useTodoControllerUpdateMutation} from "../rtkApi/todoApi.ts";
import Loader from "./Loader.tsx";
import {Delete, Edit} from '@mui/icons-material';
import {useCallback, useState} from "react";
import {Link as RouterLink} from 'react-router-dom';

type TodoItemProps = {
    todo: Todo;
}

const TodoItem = ({todo}: TodoItemProps) => {
    const [update, {isLoading}] = useTodoControllerUpdateMutation();
    const [deleteTodo, {isLoading: isDeleting}] = useTodoControllerDeleteMutation();
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title);
    const [newDescription, setNewDescription] = useState(todo.description);

    const onIconClick = useCallback(() => {
        if (isEditing) {
            update({id: todo._id, updateTodoDto: {title: newTitle, description: newDescription}});
        }
        setIsEditing(!isEditing);
    }, [isEditing, newTitle, newDescription, update, todo._id]);


    const handleCheck = useCallback(() => {
        update({id: todo._id, updateTodoDto: {completed: !todo.completed}});
    }, [todo._id, todo.completed, update]);

    const handleDelete = useCallback(() => {
        deleteTodo({id: todo._id});
    }, [todo._id, deleteTodo]);

    return (
        <>
            <ListItem key={todo._id}>
                <Checkbox checked={todo.completed} onClick={handleCheck}/>
                {!isEditing
                    ? <ListItemText
                        primary={
                            <Link component={RouterLink} to={`/todos/${todo._id}`} color="inherit">
                                {todo.title}
                            </Link>
                        }
                        secondary={todo.description}
                    />
                    : <Stack direction={"row"} width={"100%"}>
                        <TextField
                            placeholder={"Название"}
                            label={"Название"}
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            placeholder={"Описание"}
                            label={"Описание"}
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            fullWidth
                        />
                    </Stack>
                }
                <Icon onClick={onIconClick}>
                    <Edit/>
                </Icon>
                <Icon onClick={handleDelete}>
                    <Delete/>
                </Icon>
            </ListItem>
            <Loader isPresent={isLoading || isDeleting}/>
        </>
    );
};

export default TodoItem;