import {Accordion, AccordionDetails, AccordionSummary, Box, Button, Stack, TextField} from '@mui/material';
import React, {useCallback, useEffect, useState} from 'react';
import {useTodoControllerCreateMutation} from "../rtkApi/todoApi.ts";
import Loader from "./Loader.tsx";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {enqueueSnackbar} from "notistack";

const TodoAddForm = () => {
    const [todoText, setTodoText] = useState('');
    const [todoDescription, setTodoDescription] = useState('');

    const [mutate, {isSuccess, isLoading, error}] = useTodoControllerCreateMutation();

    const handleSubmit = useCallback((event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!todoText.trim()) {
            return;
        }
        mutate({createTodoDto: {title: todoText, description: todoDescription}});
        setTodoText('');
    }, [todoText, mutate, todoDescription]);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(JSON.stringify(error), {variant: 'error'});
        }
    }, [error]);

    useEffect(() => {
        if (isSuccess) {
            enqueueSnackbar('Успешно сохраненно', {variant: 'success'});
        }
    }, [isSuccess]);

    return (
        <>
            <Box component="form" onSubmit={handleSubmit} sx={{display: 'flex', alignItems: 'center', mt: 2}}>
                <Accordion sx={{width: '100%'}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        Добавить тудушку
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack gap={2}>
                            <TextField
                                label="Название"
                                variant="outlined"
                                value={todoText}
                                onChange={(e) => setTodoText(e.target.value)}
                                sx={{flexGrow: 1, mr: 2}}
                                size={"small"}
                            />
                            <TextField
                                label="Описание"
                                variant="outlined"
                                value={todoDescription}
                                onChange={(e) => setTodoDescription(e.target.value)}
                                sx={{flexGrow: 1, mr: 2}}
                                size={"small"}
                            />
                            <Button type="submit" variant="contained" color="primary">
                                Добавить
                            </Button>
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            </Box>
            <Loader isPresent={isLoading}/>
        </>
    );
};

export default TodoAddForm;
