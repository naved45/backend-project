const transactionModel = require("../models/transaction.mmodel");
const ledgerModel = require("../models/ledger.model");
const emailService = require("../services/email.service");
/**
 *  * - Create a new transaction
 * the 10-Step  Transfer Flow:
 * 1. Validate request
 * 2. Validate idempoptency key
 * 3. Check account status
 * 4. Derive Sender balance from ledger
 * 5. Create transaction (Pending)
 * 6. Create DEBIT ledger entry
 * 7.  Create CREDIT ledger entry
 * 8. Mark transaction COMPLETED
 * 9. Commit Mongodb session
 * 10.Send email notification
 */
