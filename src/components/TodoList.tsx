import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {List, Typography} from '@mui/material';
import TodoItem from "./TodoItem.tsx";
import Loader from "./Loader.tsx";
import {useTodoControllerFindAllQuery, useTodoControllerFindByTitleQuery} from "../rtkApi/todoApi.ts";

const TodoList: React.FC = () => {
    const todos = useSelector((state: RootState) => state.todos.items);
    const status = useSelector((state: RootState) => state.todos.status);
    const titleToSearch = useSelector((state: RootState) => state.todos.searchTitle);

    const { refetch: refetchTodosByTitle, isFetching: isLoadingAllTodosByTitle } = useTodoControllerFindByTitleQuery({title: titleToSearch}, {skip: titleToSearch === ''});
    const { refetch: refetchAllTodos, isFetching:isLoadingAllTodos} =useTodoControllerFindAllQuery({},{skip: titleToSearch !== ''});

    useEffect(() => {
        if(isLoadingAllTodos || isLoadingAllTodosByTitle) return;
        if (titleToSearch) {
            refetchTodosByTitle();
        } else {
            refetchAllTodos();
        }
    }, [titleToSearch, refetchTodosByTitle, refetchAllTodos]);

    return (
        <>
            <List>
                {todos?.length > 0
                    ? todos?.map((todo) => (
                        <TodoItem key={todo._id} todo={todo}/>
                    ))
                    : <Typography variant="h6">No todos found</Typography>
                }
            </List>
            <Loader isPresent={status === 'loading'}/>
        </>
    );
};

export default TodoList;
