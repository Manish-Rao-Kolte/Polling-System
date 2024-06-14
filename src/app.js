import express from "express";

const app = express();

app.use(
    express.urlencoded({
        extended: true,
        limit: "16kb",
    })
);

app.use(
    express.json({
        limit: "16kb",
    })
);

app.use(express.static("public"));

//routes import
import homeRouter from "./routes/api/v1/home.routes.js";
import questionRouter from "./routes/api/v1/question.routes.js";
import optionRouter from "./routes/api/v1/option.routes.js";

//routes use
const baseRoute = "/api/v1";
app.use(baseRoute, homeRouter);
app.use(`${baseRoute}/questions/`, questionRouter);
app.use(`${baseRoute}/options/`, optionRouter);

export { app };
