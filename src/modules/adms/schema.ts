import mongoose, { Document, Schema, Model } from "mongoose";

export type AdmAttributes = {
  email: string;
  password: string;
};

export type AdmDocument = Document & AdmAttributes;

type AdmModel = Model<AdmDocument>;

const AdmSchema = new Schema(
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<AdmDocument, AdmModel>("Adm", AdmSchema);
