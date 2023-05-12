import express from "express"
const router = express.Router()
import {welcome,preRegister,register, login, forgotPassword, accessAccount, refreshToken, currentUser, userProfile, updatePassword, profileUpdate} from '../controllers/authController.js'
import { requireSignIn } from "../middleware/auth.js"


router.get('/', requireSignIn, welcome)
router.post('/pre-register', preRegister)
router.post('/register', register)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/access-account', accessAccount)
router.get('/refresh-token', refreshToken)
router.get('/current-user', requireSignIn, currentUser)
router.get('/user-profile/:profile', userProfile)
router.put('/user/update-password', requireSignIn, updatePassword)
router.put('/user/profile-update', requireSignIn, profileUpdate)

export default router