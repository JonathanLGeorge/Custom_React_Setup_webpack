import {
  createTodo,
  loadTodosInProgress,
  loadTodosSuccess,
  loadTodosFailure,
} from "./actions";

//simple thunk
export const displayAlert = () => () => {
  alert(text);
};
//now we need to dispatch a thunk
//its almost identical to the way we dispatch actions
//we dispactch them inside the mapDispatchToProps
//open up todolist.js component

//inside mapDispatchToProps we wll diffine a prop that gets passed to our component
//call it: onDisplayAlertClicked: () => dispach(displayAlert());

export const loadTodos = () => async (dispatch, getState) => {
  //dispatch used to dispatch other redux actions from inside our thunk
  // getState is a function you can use to get access to he current sate of the redux store

  //here will will use dispactch as a means to comunicate with the rest of our application how the loading prosses is going
  //take a look at actions.js

  try {
    dispatch(loadTodosInProgress());
    //make sure our server is running
    const response = await fetch("http://localhost:8080/todos-delay");
    const todos = await response.json();

    dispatch(loadTodosSuccess(todos));
  } catch (e) {
    dispatch(loadTodosFailure());
    dispatch(displayAlert(e));
  }
};
//delay will add a delay for a few seconds.... neat!

//
export const addTodoRequest = (text) => async (dispatch) => {
  try {
    const body = JSON.stringify({ text });
    const response = await fetch("http://localhost:8080/todos", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body,
    });
    const todo = await response.json();
    dispatch(createTodo(todo));
  } catch (e) {
    dispatch(displayAlert(e));
  }
};
