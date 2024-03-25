export class Result<T> {
  private constructor(
    public readonly error: Error | undefined,
    private value: T | undefined
  ) {}

  static from<T>(v: T | Error) {
    if (v instanceof Error) {
      return new Result<T>(v, undefined);
    }
    return new Result<T>(undefined, v);
  }

  public do<R>(fn: (value: T) => Result<R>): Result<R> {
    if (this.error) {
      return Result.from<R>(this.error);
    }
    return fn(this.value as T);
  }

  public get valueOrThrow(): T {
    if (this.error) {
      throw this.error;
    }
    return this.value as T;
  }
}
