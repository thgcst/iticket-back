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
      enum: ["Enviado", "Preparando", "Pronto"],
      default: "Enviado",
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
    restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant" },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model<OrderDocument, OrderModel>("Order", OrderSchema);

export default Order;
