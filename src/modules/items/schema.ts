import mongoose, { Document, Schema, Model } from "mongoose";

export type ItemAttributes = {
  name: string;
  description?: string;
  price: number;
  image?: string;
  itemCategory: string;
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
    itemCategory: {
      type: Schema.Types.ObjectId,
      ref: "ItemCategory",
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

const Item = mongoose.model<ItemDocument, ItemModel>("Item", ItemSchema);

export default Item;
