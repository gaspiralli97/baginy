
import mongoose,{Schema}from "mongoose";
import { ViewGroup } from "../libs/enums/view.enum";

const viewScheme = new Schema({
    viewGroup:{
        type:String,
        enum:ViewGroup,
        required:true,
    },

    memberId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Member",
    },

    viewRefId:{
        type:Schema.Types.ObjectId,
        required:true,
       
    },
 },
 {timestamps:true}
);

export default mongoose.model("View", viewScheme);