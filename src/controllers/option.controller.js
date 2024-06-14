import Option from "../models/option.model.js";
import Question from "../models/question.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const removeOption = asyncHandler(async (req, res) => {
    //get which option to remove from client and validate
    //fetch option from DB and check if it has any vote
    //if no vote than delete option instance saved in question using id
    //delete option
    //send response to client
    const { id } = req.params;
    if (!id) {
        throw new apiError(400, "Option id is required!!");
    }
    const existingOption = await Option.findById(id);
    if (!existingOption) {
        throw new apiError(400, "Option does not exist with given id!!");
    }
    if (existingOption.votes > 0) {
        throw new apiError(409, "Sorry!! This option has already been voted!");
    }
    const existingQuestion = await Question.findById(existingOption.question);
    const optionList = [...existingQuestion.options];
    existingQuestion.options = [
        ...optionList.filter((option) => option === existingOption._id),
    ];
    await existingQuestion.save();
    const response = await existingOption.deleteOne();
    if (!response.acknowledged) {
        throw new apiError(500, "Error while removing option from DB!!");
    }
    return res
        .status(200)
        .json(new apiResponse(200, null, "Option removed successfully!!"));
});

const addVote = asyncHandler(async (req, res) => {
    //fetch option to add vote from client and validate
    //fetch option from DB and update
    //fetch curresponding question and update total votes.
    //send response to user
    const { id } = req.params;
    if (!id) {
        throw new apiError(400, "Option id is required!!");
    }
    const existingOption = await Option.findById(id);
    if (!existingOption) {
        throw new apiError(400, "Option does not exist with given id!!");
    }
    const existingQuestion = await Question.findById(existingOption.question);
    if (!existingQuestion) {
        throw new apiError(500, "Error while fetching question!!");
    }
    existingOption.votes = existingOption.votes + 1;
    existingQuestion.totalVotes = existingQuestion.totalVotes + 1;
    await existingOption.save();
    await existingQuestion.save();
    return res
        .status(200)
        .json(new apiResponse(200, null, "Vote added successfully!!"));
});

export { removeOption, addVote };
