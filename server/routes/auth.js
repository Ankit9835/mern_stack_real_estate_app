import express from "express"
const router = express.Router()
import {welcome,preRegister,register, login} from '../controllers/authController.js'

router.get('/', welcome)
router.post('/pre-register', preRegister)
router.post('/register', register)
router.post('/login', login)

export default router