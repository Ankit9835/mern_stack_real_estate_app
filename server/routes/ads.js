import express from "express"
const router = express.Router()
import { requireSignIn } from "../middleware/auth.js"
import {imageUpload, imageRemove} from '../controllers/imageController.js'

router.post('/upload-image',  imageUpload)
router.post('/remove-image',  imageRemove)


export default router