import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema(
    {
        questionText: {
            type: String,
            required: true,
        },
        options: [
            {
                type: Schema.Types.ObjectId,
                ref: "Option",
            },
        ],
        totalVotes: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
