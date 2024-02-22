import { BaseEvent } from "../events/BaseEvent";
import { State } from "./State";
import { Reducer } from "./reducers/Reducer";

export class StateHandler {
  private state: State;

  constructor(
    defaultState: State,
    public readonly reducers: ReadonlyArray<{ reducer: Reducer<BaseEvent> }>
  ) {
    this.state = defaultState;
  }

  public emitEvent(event: BaseEvent) {
    const reducer = this.reducers.find((r) => {
      console.log("r.reducer.prototype :>> ", r.reducer.prototype);
      return event instanceof r.reducer.prototype.constructor;
    })?.reducer;
    if (!reducer) {
      return;
    }
    this.state = reducer(this.state, event);
  }
}
