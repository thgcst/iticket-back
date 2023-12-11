import mongoose, { Document, Schema, Model } from "mongoose";

export type RestaurantAttributes = {
  name: string;
  items: string[];
  tables: string[];
  managers: string[];
};

export type RestaurantDocument = Document & RestaurantAttributes;

type RestaurantModel = Model<RestaurantDocument>;

const RestaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
    itemCategories: [
      {
        type: Schema.Types.ObjectId,
        ref: "ItemCategory",
      },
    ],
    tables: [
      {
        type: Schema.Types.ObjectId,
        ref: "Table",
      },
    ],
    managers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Manager",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Restaurant = mongoose.model<RestaurantDocument, RestaurantModel>(
  "Restaurant",
  RestaurantSchema
);

export default Restaurant;
