import mongoose, { Document, Schema, Model } from "mongoose";

export type ItemAttributes = {
  name: string;
  description?: string;
  price: number;
  image?: string;
  restaurant: string;
};

export type ItemDocument = Document & ItemAttributes;

type ItemModel = Model<ItemDocument>;

const ItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
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

export default mongoose.model<ItemDocument, ItemModel>("Item", ItemSchema);
