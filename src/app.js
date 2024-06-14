import "dotenv/config";
import express from "express";
import homeRouter from "./routes/api/v1/home.routes.js";

const app = express();

app.use(
    express.urlencoded({
        extended: true,
        limit: "16kb",
    })
);

app.use(
    express.json({
        extended: true,
    })
);

app.use(express.static("public"));

//Routers import and use.

app.use("/", homeRouter);

export { app };
