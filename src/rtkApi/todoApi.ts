import { rtkApi as api } from "./rootApi";
export const addTagTypes = ["auth", "todos"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      authControllerRegister: build.mutation<
        AuthControllerRegisterApiResponse,
        AuthControllerRegisterApiArg
      >({
        query: (queryArg) => ({
          url: `/auth/register`,
          method: "POST",
          body: queryArg.authDto,
        }),
        invalidatesTags: ["auth"],
      }),
      authControllerLogin: build.mutation<
        AuthControllerLoginApiResponse,
        AuthControllerLoginApiArg
      >({
        query: (queryArg) => ({
          url: `/auth/login`,
          method: "POST",
          body: queryArg.authDto,
        }),
        invalidatesTags: ["auth"],
      }),
      todoControllerCreate: build.mutation<
        TodoControllerCreateApiResponse,
        TodoControllerCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/todos`,
          method: "POST",
          body: queryArg.createTodoDto,
        }),
        invalidatesTags: ["todos"],
      }),
      todoControllerFindAll: build.query<
        TodoControllerFindAllApiResponse,
        TodoControllerFindAllApiArg
      >({
        query: (queryArg) => ({
          url: `/todos`,
          params: {
            completed: queryArg.completed,
            page: queryArg.page,
            limit: queryArg.limit,
          },
        }),
        providesTags: ["todos"],
      }),
      todoControllerFindByTitle: build.query<
        TodoControllerFindByTitleApiResponse,
        TodoControllerFindByTitleApiArg
      >({
        query: (queryArg) => ({ url: `/todos/title/${queryArg.title}` }),
        providesTags: ["todos"],
      }),
      todoControllerFindById: build.query<
        TodoControllerFindByIdApiResponse,
        TodoControllerFindByIdApiArg
      >({
        query: (queryArg) => ({ url: `/todos/${queryArg.id}` }),
        providesTags: ["todos"],
      }),
      todoControllerUpdate: build.mutation<
        TodoControllerUpdateApiResponse,
        TodoControllerUpdateApiArg
      >({
        query: (queryArg) => ({
          url: `/todos/${queryArg.id}`,
          method: "PATCH",
          body: queryArg.updateTodoDto,
        }),
        invalidatesTags: ["todos"],
      }),
      todoControllerDelete: build.mutation<
        TodoControllerDeleteApiResponse,
        TodoControllerDeleteApiArg
      >({
        query: (queryArg) => ({
          url: `/todos/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["todos"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as todoApi };
export type AuthControllerRegisterApiResponse = unknown;
export type AuthControllerRegisterApiArg = {
  authDto: AuthDto;
};
export type AuthControllerLoginApiResponse = unknown;
export type AuthControllerLoginApiArg = {
  authDto: AuthDto;
};
export type TodoControllerCreateApiResponse = unknown;
export type TodoControllerCreateApiArg = {
  createTodoDto: CreateTodoDto;
};
export type TodoControllerFindAllApiResponse = unknown;
export type TodoControllerFindAllApiArg = {
  /** Filter by completion status */
  completed?: boolean;
  /** Page number for pagination */
  page?: number;
  /** Limit the number of results */
  limit?: number;
};
export type TodoControllerFindByTitleApiResponse = unknown;
export type TodoControllerFindByTitleApiArg = {
  title: string;
};
export type TodoControllerFindByIdApiResponse = unknown;
export type TodoControllerFindByIdApiArg = {
  id: string;
};
export type TodoControllerUpdateApiResponse = unknown;
export type TodoControllerUpdateApiArg = {
  id: string;
  updateTodoDto: UpdateTodoDto;
};
export type TodoControllerDeleteApiResponse = unknown;
export type TodoControllerDeleteApiArg = {
  id: string;
};
export type AuthDto = {
  /** Username for the user */
  username: string;
  /** Password for the user */
  password: string;
};
export type CreateTodoDto = {
  /** Title of the todo item */
  title: string;
  /** Description of the todo item */
  description?: string;
};
export type UpdateTodoDto = {
  /** Completion status of the todo item */
  completed?: boolean;
  /** Title of the todo item */
  title?: string;
  /** Description of the todo item */
  description?: string;
};
export const {
  useAuthControllerRegisterMutation,
  useAuthControllerLoginMutation,
  useTodoControllerCreateMutation,
  useTodoControllerFindAllQuery,
  useTodoControllerFindByTitleQuery,
  useTodoControllerFindByIdQuery,
  useTodoControllerUpdateMutation,
  useTodoControllerDeleteMutation,
} = injectedRtkApi;
