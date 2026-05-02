const { Schema } = require("mongoose");

const OrdersSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    name:          String,
    qty:           Number,
    mode:          { type: String, enum: ["BUY", "SELL"] },
    orderType:     { type: String, enum: ["MARKET", "LIMIT"], default: "MARKET" },
    status:        { type: String, enum: ["PENDING", "EXECUTED", "CANCELLED"], default: "EXECUTED" },
    limitPrice:    { type: Number, default: null },   // user's target price (LIMIT only)
    executedPrice: { type: Number, default: null },   // actual fill price
  },
  { timestamps: true }
);

module.exports = { OrdersSchema };
