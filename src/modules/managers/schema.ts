import mongoose, { Document, Schema, Model } from "mongoose";

export type ManagerAttributes = {
  email: string;
  password: string;
  restaurant: string;
};

export type ManagerDocument = Document & ManagerAttributes;

type ManagerModel = Model<ManagerDocument>;

const ManagerSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Manager = mongoose.model<ManagerDocument, ManagerModel>(
  "Manager",
  ManagerSchema
);

export default Manager;
