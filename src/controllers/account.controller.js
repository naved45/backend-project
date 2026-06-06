/*const accountModel = require("../models/account.model");

async function createAccountController(req, res) {
  const user = req.user;

  const account = await accountModel.create({
    user: user._id,
  });
  res.status(201).json({
    account,
  });
}

async function getUserAccountsController(req, res) {
  const accounts = await accountModel.find({ user: req.user._id });

  res.status(200).json({
    accounts,
  });
}

module.exports = {
  createAccountController,
  getUserAccountsController,
};
*/

//adding new feature so commenting this part

const accountModel = require("../models/account.model");

// Create Account
async function createAccountController(req, res) {
  try {
    const { accountName, accountType, balance } = req.body;

    if (!accountName) {
      return res.status(400).json({
        message: "Account name is required",
      });
    }

    const account = await accountModel.create({
      user: req.user._id,
      accountName,
      accountType,
      balance: balance || 0,
    });

    return res.status(201).json({
      success: true,
      account,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

// Get All Accounts
async function getUserAccountsController(req, res) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const search = req.query.search || "";

    const accounts = await accountModel
      .find({
        user: req.user._id,
        accountName: {
          $regex: search,
          $options: "i",
        },
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalAccounts = await accountModel.countDocuments({
      user: req.user._id,
    });

    return res.status(200).json({
      success: true,
      page,
      totalAccounts,
      accounts,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

// Get Single Account
async function getSingleAccountController(req, res) {
  try {
    const account = await accountModel.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    return res.status(200).json(account);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

// Update Account
async function updateAccountController(req, res) {
  try {
    const account = await accountModel.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      {
        new: true,
      },
    );

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    return res.status(200).json({
      success: true,
      account,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

// Delete Account
async function deleteAccountController(req, res) {
  try {
    const account = await accountModel.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  createAccountController,
  getUserAccountsController,
  getSingleAccountController,
  updateAccountController,
  deleteAccountController,
};
