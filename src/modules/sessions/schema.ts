import mongoose, { Document, Schema, Model } from "mongoose";

export type SessionAttributes = {
  user: string;
  table: string;
  orders: string[];
  active: boolean;
};

export type SessionDocument = Document & SessionAttributes;

type SessionModel = Model<SessionDocument>;

const SessionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    table: {
      type: Schema.Types.ObjectId,
      ref: "Table",
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    active: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<SessionDocument, SessionModel>(
  "Session",
  SessionSchema
);
