import { Schema, model, Types } from "mongoose";

const MovieSchema = new Schema({
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
  releasedOn: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
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
  tags: {
    type: [String],
    required: true,
  },
  isEditorChoice: {
    type: Boolean,
    required: true,
  },
});

const Movie = model("Movie", MovieSchema);
export { Movie, MovieSchema };
