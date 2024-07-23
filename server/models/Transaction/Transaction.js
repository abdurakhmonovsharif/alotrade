const { TransactionState } = require("../../enums/transaction.enum");

const { Schema, model } = require("mongoose");

const transactionSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    state: {
      type: Number,
      enum: Object.values(TransactionState),
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    create_time: {
      type: Number,
      default: Date.now(),
    },
    perform_time: {
      type: Number,
      default: 0,
    },
    cancel_time: {
      type: Number,
      default: 0,
    },
    reason: {
      type: Number,
      default: null,
    },
    // code: {
    //   type: String,
    //   default: "10305008002000000",
    // },
    // package_code: {
    //   type: String,
    //   default: "1514296",
    // },
    // vat_percent: {
    //   type: Number,
    //   default: 0,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = model("transaction", transactionSchema);
