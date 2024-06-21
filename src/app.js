import express from "express";
import cors from "cors";
import swagger from "swagger-ui-express";

const app = express();

app.use(
    cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
);

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
import apiDocs from "../swagger.json" assert { type: "json" };

//routes use
const baseRoute = "/api/v1";
app.use(`${baseRoute}/api-docs/`, swagger.serve, swagger.setup(apiDocs));
app.use(baseRoute, homeRouter);
app.use(`${baseRoute}/questions/`, questionRouter);
app.use(`${baseRoute}/options/`, optionRouter);

export { app };
