import { expect, mock, test } from "bun:test";
import { StateHandler } from "./StateHandler";
import { State } from "./State";
import { Reducer } from "./reducers/Reducer";
import { BaseEvent } from "../events/BaseEvent";

class TestEvent extends BaseEvent {
  constructor(public blub: string) {
    super("test-test");
  }
}

test("find reducer", () => {
  const testReducer: Reducer<BaseEvent> = mock((state) => state);
  const stateHandler = new StateHandler(new State([]), [
    { reducer: testReducer, type: TestEvent },
  ]);

  stateHandler.emitEvent(new TestEvent("blub"));

  expect(testReducer).toHaveBeenCalled();
});
