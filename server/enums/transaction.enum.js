exports.PaymeMethod = {
  CheckPerformTransaction: "CheckPerformTransaction",
  CheckTransaction: "CheckTransaction",
  CreateTransaction: "CreateTransaction",
  PerformTransaction: "PerformTransaction",
  CancelTransaction: "CancelTransaction",
  GetStatement: "GetStatement",
};

exports.PaymeError = {
  InvalidAmount: {
    name: "InvalidAmount",
    code: -31001,
    message: {
      uz: "Noto'g'ri summa",
      ru: "Недопустимая сумма",
      en: "Invalid amount",
    },
  },
  UserNotFound: {
    name: "UserNotFound",
    code: -31050,
    message: {
      uz: "Biz sizning hisobingizni topolmadik.",
      ru: "Мы не нашли вашу учетную запись",
      en: "We couldn't find your account",
    },
  },
  CantDoOperation: {
    name: "CantDoOperation",
    code: -31008,
    message: {
      uz: "Biz operatsiyani bajara olmaymiz",
      ru: "Мы не можем сделать операцию",
      en: "We can't do operation",
    },
  },
  TransactionNotFound: {
    name: "TransactionNotFound",
    code: -31003,
    message: {
      uz: "Tranzaktsiya topilmadi",
      ru: "Транзакция не найдена",
      en: "Transaction not found",
    },
  },
  AlreadyDone: {
    name: "AlreadyDone",
    code: -31060,
    message: {
      uz: "Biz operatsiyani bajara olmaymiz",
      ru: "Мы не можем сделать операцию",
      en: "We can't do operation",
    },
  },
  Pending: {
    name: "Pending",
    code: -31050,
    message: {
      uz: "To'lov kutilayapti",
      ru: "Ожидается оплата",
      en: "Payment is pending",
    },
  },
  InvalidAuthorization: {
    name: "InvalidAuthorization",
    code: -32504,
    message: {
      uz: "Avtorizatsiya yaroqsiz",
      ru: "Авторизация недействительна",
      en: "Authorization invalid",
    },
  },
};

exports.PaymeData = {
  UserId: "user_id",
  ProductId: "product_id",
};

exports.TransactionState = {
  Paid: 2,
  Pending: 1,
  PendingCanceled: -1,
  PaidCanceled: -2,
};
