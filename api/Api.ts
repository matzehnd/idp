import express from "express";
import { Schema } from "zod";
import { Result } from "../types/Result";

export class Api<Route extends string, T, R> {
  public constructor(
    public method: "GET",
    public readonly route: Route,
    public readonly bodyParser: Schema<T>,
    public readonly fn: (body: T) => Promise<Result<R>>
  ) {}

  public get(app: express.Express) {
    app.get(this.route, async (req, res) => {
      const body = this.bodyParser.safeParse(req.body);
      if (!body.success) {
        return res.status(400).send();
      }

      const r = await this.fn(body.data);

      if (r.error) {
        return res.status(500).send(r.error.message);
      }

      return res.status(200).send(r.valueOrThrow);
    });
  }

  public use(app: express.Express) {
    switch (this.method) {
      case "GET":
        this.get(app);

      default:
        throw new Error();
    }
  }
}
