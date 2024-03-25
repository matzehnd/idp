import express, { query } from "express";
import { State } from "./state/State";
import { registerUser } from "./state/reducers/registerUser";
import { StateHandler } from "./state/StateHandler";
import { RegisterUser } from "./events/RegisterUser";
import { Api } from "./api/Api";
import { z } from "zod";
import { Queue } from "./queue/Queue";
import { getAllEvents } from "./repositories/events/getAllEvents";
import { Result } from "./types/Result";

console.log("Hello via Bun!");

const app = express();
app.use(express.json);
const port = 8081;

const stateHandler = new StateHandler(new State([]), [
  { reducer: registerUser, type: RegisterUser },
]);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const queue = new Queue(getAllEvents, () => Promise.resolve(), stateHandler);

const apis = [
  new Api(
    "GET",
    "register",
    z.object({ email: z.string() }),
    async ({ email }) => {
      await queue.add(new RegisterUser(email));
      return Result.from(undefined);
    }
  ),
];

apis.map((a) => a.use(app));

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
