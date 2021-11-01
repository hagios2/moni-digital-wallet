import express from 'express'
import AdminAuthController from "../../Controllers/Admin/AuthController.js"
import { verifyToken } from '../../Middleware/auth.js'

const router = express.Router()

router.post("/top-up/wallet", AdminAuthController.login)

router.post("/logout", verifyToken, AdminAuthController.logout)

router.post("/refresh/token", verifyToken, AdminAuthController.refreshToken)

export default router




