import {createSlice} from '@reduxjs/toolkit';
import {todoApi} from "../rtkApi/todoApi.ts";

export interface Todo {
    _id: string;
    title: string;
    completed: boolean;
    description?: string;
    createdAt: string;
    updatedAt: string;
}

interface TodosState {
    items: Todo[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    searchTitle: string;
    error: string | null;
}

const initialState: TodosState = {
    items: [],
    status: 'idle',
    error: null,
    searchTitle: '',
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        updateSearchTitle: (state, action) => {
            state.searchTitle = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(todoApi.endpoints.todoControllerFindByTitle.matchFulfilled, (state, action) => {
                    state.items = action.payload as Todo[];
                    state.status = 'succeeded';
                }
            )
            .addMatcher(todoApi.endpoints.todoControllerFindAll.matchFulfilled, (state, action) => {
                    state.items = action.payload as Todo[];
                    state.status = 'succeeded';
                }
            )
    },
});

export const {updateSearchTitle} = todosSlice.actions;

export default todosSlice.reducer;
