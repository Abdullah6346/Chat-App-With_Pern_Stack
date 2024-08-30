import express from "express";
import authroute from "./routes/auth.route";
import messageroute from "./routes/message.route";
const app = express();

const port = 3000;

app.use("/api/auth", authroute);
app.use("/api/messages", messageroute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
