import { unknown, z } from "zod";
import { BaseEvent } from "../../events/BaseEvent";
import { Result } from "../../types/Result";
import { query } from "../db/client";
import { RegisterUser } from "../../events/RegisterUser";

const parser = z.object({
  body: z.unknown(),
  name: z.string(),
});

export const getAllEvents = async (): Promise<
  ReadonlyArray<Result<BaseEvent>>
> => {
  const res = await query("select body, name from events", []);
  return res.rows
    .map((r) => {
      return parser.parse(r);
    })
    .filter((r) => ["register-user"].includes(r.name))
    .map((r) => {
      switch (r.name) {
        case "register-user":
          return RegisterUser.from(r.body);

        default:
          throw new Error();
      }
    });
};
