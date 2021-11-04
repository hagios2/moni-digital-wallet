import express from 'express'
import WalletController from '../Controllers/WalletController.js'
import CourseController from '../Controllers/CourseController.js'
import { Transaction } from '../Models/Transaction.js'
// import { verifyToken } from '../../Middleware/auth.js'

const router = express.Router()

router.post("/top-up/wallet", WalletController.topUpWallet)

router.post("/request/for/loan", WalletController.requestForLoan)

router.post("/withdraw/from/wallet", WalletController.withdrawFromWallet)

router.get("/view/wallet/transactions", WalletController.viewTransactions)

router.post("/repay/loan", WalletController.repayLoan)

router.post('/course/filter', CourseController.courseFilter)

export default router



