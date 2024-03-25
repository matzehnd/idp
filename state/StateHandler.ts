import { BaseEvent } from "../events/BaseEvent";
import { State } from "./State";
import { Reducer } from "./reducers/Reducer";

interface ReducerEntry<T extends BaseEvent> {
  reducer: Reducer<T>;
  type: new (...args: any[]) => T;
}
export class StateHandler {
  private state: State;

  constructor(
    defaultState: State,
    public readonly reducers: ReadonlyArray<ReducerEntry<BaseEvent>>
  ) {
    this.state = defaultState;
  }

  public emitEvent(event: BaseEvent) {
    const reducer = this.reducers.find((r) => {
      return event instanceof r.type;
    })?.reducer;
    if (!reducer) {
      return;
    }

    this.state = reducer(this.state, event);
  }
}
