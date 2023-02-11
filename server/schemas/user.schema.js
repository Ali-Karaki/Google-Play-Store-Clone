import { Schema, model, Types } from "mongoose";

const UserSchema = new Schema({
  _id: {
    type: Types.ObjectId,
    auto: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
});

const User = model("User", UserSchema);
export { User, UserSchema };
