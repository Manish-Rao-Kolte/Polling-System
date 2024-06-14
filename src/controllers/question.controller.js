import Option from "../models/option.model.js";
import Question from "../models/question.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createQuestion = asyncHandler(async (req, res) => {
    //get data from client
    //check for data validation
    //create question in DB
    // check if created
    // send response of api
    const { questionText } = req.body;
    if (questionText?.trim() === "") {
        throw new apiError(400, "Question is required!!");
    }
    //not applying any check for existing data as this will be open app and different users can create same poll.
    const question = await Question.create({
        questionText,
    });

    if (!question) {
        throw new apiError(500, "Error while creating Question!!");
    }

    return res
        .status(201)
        .json(
            new apiResponse(
                201,
                question,
                "Congo!!! Your question just got registered!"
            )
        );
});

const deleteQuestion = asyncHandler(async (req, res) => {
    //get id of question from client which has to be removed and validate
    //fetch question from DB and check if there are any votes on this question
    //if no votes than delete question and curresponding options
    //send response to client
    const { id } = req.params;
    if (!id) {
        throw new apiError(400, "Question id is required!!");
    }
    const existingQuestion = await Question.findById(id);
    if (!existingQuestion) {
        throw new apiError(500, "Error while getting question data from DB!!");
    }
    if (existingQuestion?.totalVotes > 0) {
        throw new apiError(
            409,
            "Sorry!! This question has already been voted!"
        );
    }
    for await (let option of existingQuestion.options) {
        const deletedOption = await Option.findByIdAndDelete(option);
        if (!deletedOption) {
            throw new apiError(
                500,
                "Error while removing option with question!!"
            );
        }
    }
    const response = await existingQuestion.deleteOne();
    if (!response.acknowledged) {
        throw new apiError(500, "Error while deleting the question!!");
    }
    return res
        .status(200)
        .json(new apiResponse(200, null, "Question removed successfully!!"));
});

const createOption = asyncHandler(async (req, res) => {
    //get data from client like question id, option text
    //check for validation
    //fetch question from DB and check if exist or not
    //create option in DB and check if created or not
    //store option instance in question
    //if successfull send response to client
    const { id } = req.params;
    const { optionText } = req.body;
    if (!(id && optionText && optionText !== "")) {
        throw new apiError(400, "Question id and option data are required!!");
    }
    const existingQuestion = await Question.findById(id);
    if (!existingQuestion) {
        throw new apiError(400, "Question does not exist with given id!!");
    }
    const option = await Option.create({
        optionText,
        question: existingQuestion._id,
    });
    if (!option) {
        throw new apiError(500, "Error while creating option!!");
    }
    const url = `${req.protocol}://${req.get("host")}/api/v1/options/${
        option._id
    }/add_vote`;
    // const url = `https://polling-system-r78d.onrender.com/api/v1/options/${option._id}/add_vote`;
    option.link_to_vote = url;
    await option.save();
    await existingQuestion.updateOne({
        $push: { options: option._id },
    });
    // existingQuestion.options.push(option._id);
    // await existingQuestion.save();
    return res
        .status(201)
        .json(
            new apiResponse(201, option, "Option is registered successfully!")
        );
});

const viewQuestion = asyncHandler(async (req, res) => {
    //get which question needs to be fetched from client and validate
    //fetch question along with populating options from DB
    //send response to client
    const { id } = req.params;
    console.log(id);
    if (!id) {
        throw new apiError(400, "Question id is required!!");
    }
    const existingQuestion = await Question.findById(id)
        .select("-createdAt -updatedAt")
        .populate({
            path: "options",
            select: "-createdAt -updatedAt -question",
        })
        .exec();
    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                existingQuestion,
                "Question is fetched successfully!!"
            )
        );
});

export { createQuestion, deleteQuestion, createOption, viewQuestion };
