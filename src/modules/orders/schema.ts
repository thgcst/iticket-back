import mongoose, { Document, Schema, Model } from "mongoose";

export type OrderAttributes = {
  status: string;
  items: { item: string; quantity: number }[];
  session: string;
};

export type OrderDocument = Document & OrderAttributes;

type OrderModel = Model<OrderDocument>;

const OrderSchema = new Schema(
  {
    status: {
      type: String,
      required: true,
      trim: true,
      default: "Novo",
    },
    items: [
      {
        item: {
          type: Schema.Types.ObjectId,
          ref: "Item",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    session: { type: Schema.Types.ObjectId, ref: "Session" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<OrderDocument, OrderModel>("Order", OrderSchema);
