import mongoose, { Document, Schema, Model } from "mongoose";

export type UserAttributes = {
  name: string;
  phone: string;
  sessions: string[];
};

export type UserDocument = Document & UserAttributes;

type UserModel = Model<UserDocument>;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    phone: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      immutable: true,
      required: true,
    },
    sessions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Session",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<UserDocument, UserModel>("User", UserSchema);

export default User;
