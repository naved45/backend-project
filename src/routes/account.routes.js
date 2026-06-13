/*const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const accountController = require("../controllers/account.controller");

const router = express.Router();

/**
 * -POST /api/accounts/
 * -Creat a new account
 * -Protected ROute
 */

router.post(
  "/",
  authMiddleware.authMiddleware,
  accountController.createAccountController,
);

/**
 *  - GET /api/accounts/
 *  - Get all accounts of the logged-in user
 * -Protected Route
 */

router.get(
  "/",
  authMiddleware.authMiddleware,
  accountController.getUserAccountsController,
);

//module.exports = router;

// adding new feature so commenting this part

const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const accountController = require("../controllers/account.controller");

const router = express.Router();

router.post(
  "/",
  authMiddleware.authMiddleware,
  accountController.createAccountController,
);

router.get(
  "/",
  authMiddleware.authMiddleware,
  accountController.getUserAccountsController,
);

router.get(
  "/:id",
  authMiddleware.authMiddleware,
  accountController.getSingleAccountController,
);

//commenting this part you xan uncommnet this next time

/*
router.put(
  "/:id",
  authMiddleware.authMiddleware,
  accountController.updateAccountController,
);

router.delete(
  "/:id",
  authMiddleware.authMiddleware,
  accountController.deleteAccountController,
);

module.exports = router;
*/