import express from "express"
const router = express.Router()
import {welcome} from '../controllers/authController.js'

router.get('/', welcome)

export default router