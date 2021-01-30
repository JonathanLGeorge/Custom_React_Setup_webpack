import { expect } from "chai";
import { todos } from "../reducers";

describe("The todos reducer", () => {
  it("Adds a new todo when CREATE_TODO action is received", () => {
    const fakeTodo = { text: "hello", isCompleted: false };
    const fakeAction = {
      type: "CREATE_TODO", //hardcoded
      payload: {
        todo: fakeTodo,
      },
    };
    //remember this is the structure of our todos in our redux store
    const originalState = { isLoading: false, data: [] };

    const expected = {
      isLoading: false,
      data: [fakeTodo],
    };

    // now that we difened expected value we are going to get the actuall value that our todos reducer returns in this situation
    const actual = todos(originalState, fakeAction);

    //going to use chai to compare our actual and expected results
    expect(actual).to.deep.equal(expected);
  });
});
