import TodoPageHeader from "./TodoPageHeader.tsx";
import TodoList from "./TodoList.tsx";
import {Container} from "@mui/material";
import AddTodo from "./AddTodo.tsx";

const TodoPage = () => {
    return (
        <>
            <TodoPageHeader/>
            <Container>
                <AddTodo/>
                <TodoList/>
            </Container>
        </>
    );
};

export default TodoPage;