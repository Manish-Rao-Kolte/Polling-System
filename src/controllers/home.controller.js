import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const renderHome = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new apiResponse(200, null, "Hey, I am from Mars!!!!"));
});

export { renderHome };
