import express from "express"
const router = express.Router()
import { requireSignIn } from "../middleware/auth.js"
import {imageUpload, imageRemove} from '../controllers/imageController.js'
import {postAd, getAllAds, singleAds, addToWishList, removeFromWishList} from '../controllers/adController.js'

router.post('/upload-image',  imageUpload)
router.post('/remove-image',  imageRemove)
router.post('/post-ad', requireSignIn, postAd)
router.get('/all-ads', getAllAds)
router.get('/single-ads/:slug', singleAds)
router.post('/add-to-wishlist', requireSignIn, addToWishList)
router.post('/remove-from-wishlist/:wishlist', requireSignIn, removeFromWishList)


export default router