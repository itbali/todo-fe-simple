import {createBrowserRouter} from "react-router-dom";
import {Redirector} from "./Redirector.tsx";
import TodoPage from "../TodoPage.tsx";
import LoginForm from "../LoginForm.tsx";
import NotFoundPage from "../NotFoundPage.tsx";
import {ROUTES} from "./Routes.enum.ts";
import ErrorPage from './ErrorPage';
import TodoDetails from "../TodoDetails.tsx";

export const router = createBrowserRouter([
    {
        id: "root",
        path: ROUTES.ROOT,
        element: <Redirector/>,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <TodoPage/>
            },
            {
                element: <TodoDetails/>,
                path: `${ROUTES.TODO}/:id`
            }
        ]
    },
    {
        path: ROUTES.LOGIN,
        element: <LoginForm/>,
        errorElement: <ErrorPage />,
    },
    {
        path: ROUTES.NOT_FOUND,
        element: <NotFoundPage/>,
        errorElement: <ErrorPage />,
    }
]);