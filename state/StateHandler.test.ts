import { expect, mock, test } from "bun:test";
import { StateHandler } from "./StateHandler";
import { State } from "./State";
import { Reducer } from "./reducers/Reducer";
import { BaseEvent } from "../events/BaseEvent";

class TestEvent extends BaseEvent {
  constructor() {
    super("test-test");
  }
}

test("find reducer", () => {
  const testReducer: Reducer<TestEvent> = mock((state) => state);
  const stateHandler = new StateHandler(new State([]), [
    { reducer: testReducer },
  ]);

  stateHandler.emitEvent(new TestEvent());

  expect(testReducer.mock);
});
