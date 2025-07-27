import mongoose, { Schema } from "mongoose";

const meetingschema=new Schema(
    {
        user_id:{
            type:String,
        },
        meetingcode:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            default:Date.now,
            required:true
        }
    }
)
const meeting=mongoose.model("meeting",meetingschema);
export {meeting};