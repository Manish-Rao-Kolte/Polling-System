import { Router } from "express";
import {
    createOption,
    createQuestion,
    deleteQuestion,
    viewQuestion,
} from "../../../controllers/question.controller.js";

const questionRouter = Router();

questionRouter.post("/create", createQuestion);
questionRouter.post("/:id/options/create", createOption);

questionRouter.get("/:id", viewQuestion);
questionRouter.get("/:id/delete", deleteQuestion);

export default questionRouter;
