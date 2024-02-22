import express from "express";

console.log("Hello via Bun!");

const app = express();
const port = 8081;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
