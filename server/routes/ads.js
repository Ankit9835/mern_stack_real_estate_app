import express from "express"
const router = express.Router()
import { requireSignIn } from "../middleware/auth.js"
import {imageUpload} from '../controllers/imageController.js'

router.post('/upload-image', requireSignIn, imageUpload)


export default router