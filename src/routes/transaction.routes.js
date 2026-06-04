const { Router } = require("express");
const authMiddleware = require('../middleware/authMiddlware')

const transactionRoutes = Router();

/**
 * - POST /pi/transaction/
 *  -Create  a new transaction
 *
 *
 */

transactionRoutes.post(
  "/",
  authMiddleware.authMiddleware,
  transactionController.createTransaction,
);

/**
 * -POST /api/transactions/system/initial-funds
 * - Create initial funds transaction for system user
 */

transactionRoutes.post(
  "/system/initial-funds",
  authMiddleware.authSystemUserMiddleware,
  transactionController.createInitialFundsTransaction,
);

module.exports = transactionRoutes;
