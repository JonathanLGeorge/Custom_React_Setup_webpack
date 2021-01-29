import {
  CREATE_TODO,
  REMOVE_TODO,
  MARK_TODO_AS_COMPLETED,
  LOAD_TODOS_IN_PROGRESS,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_FAILURE,
} from "./actions";

const initialState = { isLoading: false, data: [] };

//set the defualt state to initial state
export const todos = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TODO: {
      const { todo } = payload;
      return {
        ...state, //get the rest of the state untouched
        data: state.data.concat(todo), //our new todo item
      };
    }
    case REMOVE_TODO: {
      const { todo: todoToRemove } = payload;
      return {
        ...state,
        data: state.data.filter((todo) => todo.id !== todoToRemove.id),
      };
    }
    case MARK_TODO_AS_COMPLETED: {
      const { todo: updatedTodo } = payload;
      return {
        ...state,
        data: state.data.map((todo) => {
          if (todo.id === updatedTodo.id) {
            return updatedTodo;
          }
          return todo;
        }),
      };
    }
    //our isloading reducer....
    //
    case LOAD_TODOS_SUCCESS: {
      const { todos } = payload;
      return {
        ...state,
        isLoading: false,
        data: todos, //sets data to the todos that loaded
      };
    }
    case LOAD_TODOS_IN_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_TODOS_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

//before selectors:

// //async stuff is happening with these
// export const isLoading = (state = false, action) => {
//   const { type } = action;

//   switch (type) {
//     case LOAD_TODOS_IN_PROGRESS: //just stated loading
//       return true; //the loading is still going
//     case LOAD_TODOS_SUCCESS:
//     case LOAD_TODOS_FAILURE:
//       return false; // the loading has ended
//     default:
//       return state; //current state before the action was recived
//   }
//   //make sure to go into store.js and make your updates to imported todos/reducers
// };
// //reducers take 2 arguments
// export const todos = (state = [], action) => {
//   //action has type and payload.
//   const { type, payload } = action;

//   switch (type) {
//     case CREATE_TODO: {
//       //look at actions.js
//       ////const { text } = payload; //you can see we defined this in actions.js || payload:{text}
//       //replaced by
//       const { todo } = payload;
//       //create new todo item
//       /* changed the code to only use the return  that will simply return this todo concatinated to the current state
//       const newTodo = {
//         text, //text we got from payload
//         isCompleted: false, // this is a check property
//       };
//       */
//       //return state.concat(newTodo); //return current state with newTodo concat.  concat will not mutate the state. its very important we dont mutate the state in any way here
//       return state.concat(todo);
//     }
//     case REMOVE_TODO: {
//       const { todo: todoToRemove } = payload;
//       return state.filter((todo) => todo.id !== todoToRemove.id);
//     }

//     /*
//     case MARK_TODO_AS_COMPLETED: {
//       const { text } = payload;
//       return state.map((todo) => {
//         if (todo.text === text) {
//           //todo.tex === to the payload text
//           return { ...todo, isCompleted: true };
//         }
//         return todo;
//       });
//     }
//     */
//     case MARK_TODO_AS_COMPLETED: {
//       const { todo: updatedTodo } = payload;
//       return state.map((todo) => {
//         if (todo.id === updatedTodo.id) {
//           return updatedTodo;
//         }
//         return todo;
//       });
//     }
//     case LOAD_TODOS_SUCCESS: {
//       //taking care of our async stuff
//       const { todos } = payload;
//       return todos;
//     }
//     case LOAD_TODOS_IN_PROGRESS:
//     case LOAD_TODOS_FAILURE:
//     default:
//       return state; //we need this because this will get called when any action gets triggerd so we need a default
//   }
// };

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
