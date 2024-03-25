import { BaseEvent } from "../../events/BaseEvent";
import { RegisterUser } from "../../events/RegisterUser";
import { State } from "../State";
import { User } from "../models/User";
import { Reducer } from "./Reducer";

export const registerUser: Reducer<BaseEvent> = (state, event) => {
  if (!(event instanceof RegisterUser)) {
    return state;
  }
  const registeredUsers = [
    ...state.registeredUsers,
    ...(state.registeredUsers.some((u) => u.email === event.email)
      ? []
      : [new User(event.email)]),
  ];
  return new State(registeredUsers);
};
