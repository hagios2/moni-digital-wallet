import express from 'express'
import AuthController from '../Controllers/AuthController.js'
// import { verifyToken } from '../../Middleware/auth.js'

const router = express.Router()

router.post("/login", AuthController.login)

router.post("/logout", AuthController.logout)

router.post("/refresh/token", AuthController.refreshToken)

export default router

