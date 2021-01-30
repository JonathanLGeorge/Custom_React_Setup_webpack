import "node-fetch";
import fetchMock from "fetch-mock";
import { expect } from "chai";
import sinon from "sinon";
import { loadTodos } from "../thunks";
/**
 * if you look at our ./todos/thunks.js
 * loadTodos
 * when we call this function it gives us back an async function that takes dispatch as an argument
 * it calls back dispatch several times with the actions we are looking for
 */
describe("The loadTodos thunk", () => {
  it("Dispatches the correct actions in the success scenario", async () => {
    const fakeDispatch = sinon.spy(); //this is how we create a fake function that keeps track of which arguments it was called with

    //for testing purposes we dont want to be sending real requests to our sever thats what feth mock is for
    const fakeTodos = [{ text: "1" }, { text: "2" }];
    fetchMock.get("http://localhost:8080/todos", fakeTodos);
    //when our thunk tries to use fetch to send a GET request to this URL...
    // it will get back te fakeTodos we defined instead of sending an actuall request

    const expectedFirstAction = { type: "LOAD_TODOS_IN_PROGRESS" };
    const expectedSecondAction = {
      type: "LOAD_TODOS_SUCCESS",
      payload: {
        todos: fakeTodos,
      },
    };

    //calling our thunk
    await loadTodos()(fakeDispatch);

    //the actual test part
    //getCall(0) is refering to the first call that was made to our fake dispatch
    //.agrs[0] is refering to the first argument that was [assed durring the first call to fake dispatch
    expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedFirstAction);
    expect(fakeDispatch.getCall(1).args[0]).to.deep.equal(expectedSecondAction);

    //we need to restore our fetch to its origonal state because we changed it above
    fetchMock.reset();
  });
});

//some new packages were used
//node-fetch fetch-mock
