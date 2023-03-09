import { Schema, model, Types } from "mongoose";

const BookSchema = new Schema({
  _id: {
    type: Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  pictures: [
    {
      type: String,
      required: true,
    },
  ],
  releasedOn: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ageRestrictions: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
  downloads: {
    type: Number,
    required: true,
  },
  aboutAuthor: {
    type: String,
    required: true,
  },
  isComic: {
    type: Boolean,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: false,
  },
  duration: {
    type: String,
    required: false,
  },
  narratedBy: {
    type: String,
    required: false,
  },
});

const Book = model("Book", BookSchema);
export { Book, BookSchema };
