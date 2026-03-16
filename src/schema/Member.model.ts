import mongoose, { Schema } from "mongoose";
import { MemberStatus, MemberType } from "../libs/enums/member.enum";

const memberSchema = new Schema({
  memberType: {
    type: String,
    enum: Object.values(MemberType), // enum to‘g‘ri ishlaydi
    default: MemberType.USER,
  },
  memberStatus: {
    type: String,
    enum: Object.values(MemberStatus),
    default: MemberStatus.ACTIVE,
  },
  memberNick: {
    type: String,
    unique: true,      // sparse olib tashlandi
    required: true,
  },
  memberPhone: {
    type: String,
    unique: true,
    required: true,
  },
  memberPassword: {
    type: String,
    required: true,
    select: false,     // login paytida .select("+memberPassword") ishlatamiz
  },
  memberAddress: String,
  memberDesc: String,
  memberPoints: { type: Number, default: 0 },
  memberImage: String,
}, { timestamps: true });

export default mongoose.model("Member", memberSchema);