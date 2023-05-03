import express from "express"
const router = express.Router()
import {welcome,preRegister} from '../controllers/authController.js'

router.get('/', welcome)
router.post('/pre-register', preRegister)

export default router