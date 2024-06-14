import mongoose, { Schema } from "mongoose";

const optionSchema = new Schema(
    {
        optionText: {
            type: String,
            required: true,
        },
        votes: {
            type: Number,
            default: 0,
        },
        link_to_vote: {
            type: String,
        },
        question: {
            type: Schema.Types.ObjectId,
            ref: "Question",
            required: true,
        },
    },
    { timestamps: true }
);

const Option = mongoose.model("Option", optionSchema);

export default Option;
