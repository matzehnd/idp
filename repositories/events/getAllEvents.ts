import { query } from "../db/client";

export const getAllEvents = async () => {
  const res = await query("select * from events", []);
};
