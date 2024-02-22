import { BaseEvent } from "../../events/BaseEvent";
import { State } from "../State";

export type Reducer<T extends BaseEvent> = (state: State, event: T) => State;
