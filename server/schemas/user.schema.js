import { Schema, model, Types } from "mongoose";

const UserSchema = new Schema({
  _id: {
    type: Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  wishlist: [
    {
      category: {
        type: String,
        required: true,
      },
      id: {
        type: Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      stars: {
        type: Number,
        required: true,
      },
      logo: {
        type: String,
        required: true,
      },
    },
  ],
});

const User = model("User", UserSchema);
export { User, UserSchema };
