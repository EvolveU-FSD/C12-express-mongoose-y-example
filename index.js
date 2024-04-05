import express from 'express'
import bp from 'body-parser'
import ynotRouter from './routes/ynotRouter.js'

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(bp.urlencoded());

app.use("*", (req, res, next) => {
  console.log("path is", req.originalUrl);
  next();
});

app.get("/test", (req, res) => {
  res.send("test endpoint working");
});

app.use("/ynot", ynotRouter);

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
