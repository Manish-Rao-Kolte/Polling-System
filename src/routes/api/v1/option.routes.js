import { Router } from "express";
import {
    addVote,
    removeOption,
} from "../../../controllers/option.controller.js";

const optionRouter = Router();

optionRouter.get("/:id/delete", removeOption);

optionRouter.get("/:id/add_vote", addVote);

export default optionRouter;
