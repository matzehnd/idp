import { BaseEvent } from "../events/BaseEvent";
import { StateHandler } from "../state/StateHandler";
import { Result } from "../types/Result";

export class Queue {
  public constructor(
    private loadAllEvents: () => Promise<ReadonlyArray<Result<BaseEvent>>>,
    private persisteEvent: (event: BaseEvent) => Promise<void>,
    public readonly stateHandler: StateHandler
  ) {}

  public async add(event: BaseEvent): Promise<void> {
    await this.persisteEvent(event);
    this.stateHandler.emitEvent(event);
  }

  public async reset(): Promise<void> {
    const events = await this.loadAllEvents();
    events.forEach((e) =>
      e.do((event) => Result.from(this.stateHandler.emitEvent(event)))
    );
  }
}
