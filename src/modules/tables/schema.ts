import mongoose, { Document, Schema, Model } from "mongoose";

export type TableAttributes = {
  number: number;
  restaurant: string;
  sessions: string[];
};

export type TableDocument = Document & TableAttributes;

type TableModel = Model<TableDocument>;

const TableSchema = new Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant" },
    sessions: [{ type: Schema.Types.ObjectId, ref: "Session" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<TableDocument, TableModel>("Table", TableSchema);