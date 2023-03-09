import { Schema, model, Types } from "mongoose";

const AppsSchema = new Schema({
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
  pictures: {
    type: [String],
    required: true,
  },
  devices: {
    type: [String],
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
  releasedOn: {
    type: Date,
    required: true,
  },
  updatedOn: {
    type: Date,
    required: true,
  },
  size: {
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
  isOffline: {
    type: Boolean,
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
  dataSafety: {
    canDeleteData: {
      type: Boolean,
      required: true,
    },
    encryptsDataInTransit: {
      type: Boolean,
      required: true,
    },
    collectsData: {
      type: Boolean,
      required: true,
    },
    sharesDataWith: {
      isSharing: {
        type: Boolean,
        required: true,
      },
      thirdParties: {
        type: [String],
        required: true,
      },
    },
  },
});

const Apps = model("Apps", AppsSchema);
export { Apps, AppsSchema };
