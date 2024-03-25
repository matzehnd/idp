import { z } from "zod";
import { BaseEvent } from "./BaseEvent";
import { Result } from "../types/Result";

export class RegisterUser extends BaseEvent {
  constructor(public readonly email: string) {
    super("register-user");
  }

  public get plain() {
    return {
      email: this.email,
    };
  }

  static from(body: unknown): Result<RegisterUser> {
    const parser = z.object({
      email: z.string(),
    });
    const res = parser.safeParse(body);

    if (res.success) {
      return Result.from(new RegisterUser(res.data.email));
    }

    return Result.from<RegisterUser>(new Error(res.error.message));
  }
}
