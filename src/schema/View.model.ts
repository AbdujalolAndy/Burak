import { Schema, model } from "mongoose"
import { ViewGroup } from "../libs/enums/view.enum"

const viewSchema = new Schema({
    memberId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Member"
    },
    viewRefId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    viewGroup: {
        type: String,
        enum: ViewGroup,
        required: true,
    }
}, { timestamps: true })

export default model("View", viewSchema)