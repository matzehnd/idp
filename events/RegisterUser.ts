import { BaseEvent } from "./BaseEvent";

export class RegisterUser extends BaseEvent {
  constructor(public readonly email: string) {
    super("register-user");
  }
}
