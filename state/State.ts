import { User } from "./models/User";

export class State {
  constructor(public readonly registeredUsers: ReadonlyArray<User>) {}
}
