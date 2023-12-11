import mongoose, { Document, Schema, Model } from "mongoose";

export type ItemCategoryAttributes = {
  name: string;
  description?: string;
  order: number;
  image?: string;
  restaurant: string;
};

export type ItemCategoryDocument = Document & ItemCategoryAttributes;

type ItemCategoryModel = Model<ItemCategoryDocument>;

const ItemCategorySchema = new Schema(
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
    order: {
      type: Number,
      required: true,
      default: 0,
      unique: true,
    },
    image: {
      type: String,
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ItemCategory = mongoose.model<ItemCategoryDocument, ItemCategoryModel>(
  "ItemCategory",
  ItemCategorySchema
);

export default ItemCategory;
