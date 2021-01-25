import { CREATE_TODO, REMOVE_TODO } from "./actions";

//reducers take 2 arguments
export const todos = (state = [], action) => {
  //action has type and payload.
  const { type, payload } = action;

  switch (type) {
    case CREATE_TODO: {
      //look at actions.js
      const { text } = payload; //you can see we defined this in actions.js || payload:{text}
      //create new todo item
      const newTodo = {
        text, //text we got from payload
        isCompleted: false, // this is a check property
      };
      return state.concat(newTodo); //return current state with newTodo concat.  concat will not mutate the state. its very important we dont mutate the state in any way here
    }
    case REMOVE_TODO: {
      //look at actions.js
      const { text } = payload;
      return state.filter((todo) => todo.text !== text);
    }
    default:
      return state; //we need this because this will get called when any action gets triggerd so we need a default
  }
};

/*
a reducer is just a function named after whatever resource in the
redux store its incharge of managing

anytime an action is taken anywhere in our aplication
our reducer will get called
when this happens, 
1st: the 2 arguments that will get passed to our reducer 
are the current state the resourse the reducer in managing, 
2nd: the action that was triggered (an object with type and payload)

so basically they take current state and the action that was triggered 
and decied what cahnges should accure in the state as a result of this action 
then return the updated state and redux will take this returned state and set current state to that
*/
