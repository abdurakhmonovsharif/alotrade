const { User } = require("../../models/User/User");
const Transaction = require("../../models/Transaction/Transaction");
const TransactionError = require("../../errors/transaction.error");
const {
  PaymeError,
  PaymeData,
  TransactionState,
} = require("../../enums/transaction.enum");
const { default: mongoose } = require("mongoose");
const { config } = require("../../packages");

module.exports = class HomeController {
  static async HomePostController(req, res, next) {
    try {
      switch (req.body.method) {
        case "CheckPerformTransaction":
          HomeController.CheckPerformTransaction(req, res, next);
          break;

        case "CreateTransaction":
          HomeController.CreateTransaction(req, res, next);
          break;

        case "CheckTransaction":
          HomeController.CheckTransaction(req, res, next);
          break;

        case "PerformTransaction":
          HomeController.PerformTransaction(req, res, next);
          break;

        case "CancelTransaction":
          HomeController.CancelTransaction(req, res, next);
          break;

        case "GetStatement":
          HomeController.GetStatement(req, res, next);
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async CheckPerformTransaction(req, res, next) {
    try {
      const { params } = req.body;
      const { user_id } = params.account;
      let { amount } = params;
      const id = req.body.id;

      if (!mongoose.Types.ObjectId.isValid(user_id)) {
        throw new TransactionError(
          PaymeError.UserNotFound,
          id,
          PaymeData.UserId
        );
      }

      const user = await User.findOne({ _id: user_id, isArchive: false });

      if (!user) {
        throw new TransactionError(
          PaymeError.UserNotFound,
          id,
          PaymeData.UserId
        );
      }

      amount = Math.floor(amount / 100);

      if (params.amount < 1000) {
        console.log(params.amount);
        throw new TransactionError(PaymeError.InvalidAmount, id);
      }

      res.json({
        result: {
          allow: true,
          detail: {
            receipt_type: 0,
            items: [
              {
                title: "Заполнение баланса",
                price: params.amount,
                count: 1,
                code: config.get("transaction_code"),
                vat_percent: 0,
                package_code: config.get("transaction_package_code"),
              },
            ],
          },
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async CreateTransaction(req, res, next) {
    try {
      const { params } = req.body;
      const {
        account: { user_id },
        id,
        time,
      } = params;

      let { amount } = params;

      amount = Math.floor(amount / 100);

      if (!mongoose.Types.ObjectId.isValid(user_id)) {
        throw new TransactionError(
          PaymeError.UserNotFound,
          id,
          PaymeData.UserId
        );
      }

      const user = await User.findOne({ _id: user_id, isArchive: false });

      if (!user) {
        throw new TransactionError(
          PaymeError.UserNotFound,
          id,
          PaymeData.UserId
        );
      }

      if (amount < 1000) {
        throw new TransactionError(PaymeError.InvalidAmount, id);
      }

      let transaction = await Transaction.findOne({ id });
      if (!transaction) {
        transaction = await Transaction.create({
          id: id,
          state: TransactionState.Pending,
          amount,
          user_id,
          create_time: time,
        });
      }

      res.json({
        result: {
          transaction: transaction.id,
          state: TransactionState.Pending,
          create_time: transaction.create_time,
        },
        id,
      });
    } catch (err) {
      next(err);
    }
  }

  static async CheckTransaction(req, res, next) {
    try {
      const { params } = req.body;
      const { id } = params;

      const transaction = await Transaction.findOne({ id });

      if (!transaction) {
        throw new TransactionError(PaymeError.TransactionNotFound, id);
      }

      res.json({
        result: {
          create_time: transaction.create_time,
          perform_time: transaction.perform_time,
          cancel_time: transaction.cancel_time,
          transaction: transaction.id,
          state: transaction.state,
          reason: transaction.reason,
        },
        id,
      });
    } catch (err) {
      next(err);
    }
  }

  static async PerformTransaction(req, res, next) {
    try {
      const { params } = req.body;
      const { id } = params;

      const transaction = await Transaction.findOne({ id });

      if (!transaction) {
        throw new TransactionError(PaymeError.TransactionNotFound, id);
      }

      if (transaction.state == TransactionState.Paid) {
        return res.json({
          result: {
            transaction: transaction.id,
            state: TransactionState.Paid,
            perform_time: transaction.perform_time,
          },
          id,
        });
        // throw new TransactionError(PaymeError.CantDoOperation, id);
      }

      if (transaction.state == TransactionState.Pending) {
        const user = await User.findOne({
          _id: transaction.user_id,
          isArchive: false,
        });

        user.balance += transaction.amount;
        await user.save();

        transaction.perform_time = Date.now();
        transaction.state = TransactionState.Paid;
        await transaction.save();
      }

      res.json({
        result: {
          transaction: transaction.id,
          state: TransactionState.Paid,
          perform_time: transaction.perform_time,
        },
        id,
      });
    } catch (err) {
      next(err);
    }
  }

  static async CancelTransaction(req, res, next) {
    try {
      const { params } = req.body;
      const { id, reason } = params;

      const transaction = await Transaction.findOne({ id });

      if (!transaction) {
        throw new TransactionError(PaymeError.TransactionNotFound, id);
      }

      if (transaction.state === TransactionState.Pending) {
        transaction.state = TransactionState.PendingCanceled;
        transaction.cancel_time = Date.now();
        transaction.reason = reason;

        await transaction.save();

        return res.json({
          result: {
            cancel_time: transaction.cancel_time,
            transaction: transaction.id,
            state: transaction.state,
          },
          id,
        });
      } else if (transaction.state === TransactionState.Paid) {
        const user = await User.findByIdAndUpdate(transaction.user_id);

        user.balance -= transaction.amount;
        await user.save();

        transaction.state = TransactionState.PaidCanceled;
        transaction.cancel_time = Date.now();
        transaction.reason = reason;
        await transaction.save();

        return res.json({
          result: {
            cancel_time: transaction.cancel_time,
            transaction: transaction.id,
            state: transaction.state,
          },
          id,
        });
      } else {
        return res.json({
          result: {
            cancel_time: transaction.cancel_time,
            transaction: transaction.id,
            state: transaction.state,
          },
          id,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async GetStatement(req, res, next) {
    try {
      const { params } = req.body;
      const { from, to } = params;

      const transactions = await Transaction.find({
        create_time: {
          $gte: from,
          $lte: to,
        },
        state: 2,
      });

      res.send({
        result: {
          transactions,
        },
      });
    } catch (err) {
      next(err);
    }
  }
};
