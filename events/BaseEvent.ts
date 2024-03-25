import { Result } from "../types/Result";

export abstract class BaseEvent {
  constructor(public readonly name: string) {}

  public abstract get plain(): unknown;

  public static from(body: string): Result<BaseEvent> {
    throw new Error("not implemented");
  }

  public toString(): string {
    return JSON.stringify(this.plain);
  }
}
