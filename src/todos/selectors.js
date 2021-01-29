import { createSelector } from "reselect";

export const getTodos = (state) => state.todos.data;
export const getTodosLoading = (state) => state.todos.isLoading;

export const getIncompleteTodos = createSelector(getTodos, (todos) =>
  todos.filter((todo) => !todo.isCompleted)
);

export const getCompletedTodos = createSelector(getTodos, (todos) =>
  todos.filter((todo) => todo.isCompleted)
);

//so if we pass getImpompleteTodos(state) from inside a mastatetoprops... this would return all the todos in the sate thats incomplete prop is false

/**
 * what happens in createselector... you can pass it many selectors as you want
 * the last function you pass will get the result of all the other selectors before it 
 
 so lets imagine we also needed or wanted to know wether or not or todos are loading
 we can add in out isLoading selector as an additional argument
 and then the return value of the slector would get apassed to our final function as a second argument 
 export const getIncompleteTodos = createSelector(
    getTodos,
    getTodosLoading,
    (todos, isLoading) => todos.filter(todo => !todo.isCompleted),

so if we wante to use this isLoading argument to modifiy the return value of get incomplete todos...
for example we wanted to return an empty array whenever to todos were loading... we can do that logi here like so 


export const getIncompleteTodos = createSelector(
    getTodos,
    getTodosLoading,
    (todos, isLoading) => isLoading ? [] : todos.filter(todo => !todo.isCompleted),

    );
 */
