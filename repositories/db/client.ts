import { Pool } from "pg";

const pool = new Pool();

export const query = <I extends unknown[]>(text: string, params: I) => {
  return pool.query(text, params);
};
