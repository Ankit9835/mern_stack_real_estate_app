import express from "express"
const router = express.Router()
import {welcome,preRegister,register, login, forgotPassword, accessAccount, refreshToken} from '../controllers/authController.js'
import { requireSignIn } from "../middleware/auth.js"


router.get('/', requireSignIn, welcome)
router.post('/pre-register', preRegister)
router.post('/register', register)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/access-account', accessAccount)
router.post('/refresh-token', refreshToken)

export default router