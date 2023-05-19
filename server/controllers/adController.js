import ad from "../model/ad.js"
import user from "../model/user.js"
import slugify from "slugify";
import { nanoid } from "nanoid";


export const postAd = async (req,res) => {
    try {
        console.log(req.body)
        const adCreate = await ad.create({
            ...req.body,
            postedBy:req.user._id,
            location:{
                type:'point',
                coordinates:[74.858610,24.466030]
            },
            slug: slugify(`${req.body.type}-${req.body.address}-${req.body.price}-${nanoid(6)}`),
        })

        const newUser = await user.findOneAndUpdate({_id:req.user._id}, {$set: {role:'Seller'}}, {new:true})
        newUser.password = undefined
        newUser.resetCode = undefined
        return res.status(200).json({
            status:true,
            message:'Ad created successfully',
            adCreate,
            newUser
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status:false,
            message:'something went wrong',
        })
    }
}

export const getAllAds = async (req,res) => {
    try {
        const addForSell = await ad.find({action:'Sell'})
        .select('-googleMap -location -photo.key -photo.ETag')
        .sort({createdAt:-1}).limit(10)

        const addForRent = await ad.find({action:'Rent'})
        .select('-googleMap -location -photo.key -photo.ETag')
        .sort({createdAt:-1}).limit(10)
        //console.log('addForSell', addForSell)
        return res.status(200).json({
            status:true,
            sell:addForSell,
            rent:addForRent
        })
    } catch (error) {
        console.log(error)
        return res.send({
            status:false,
            message:'something went wrong'
        })
    }
}

export const singleAds = async (req,res) => {
    try {
        const ads = await ad.findOne({slug:req.params.slug}).populate('postedBy', 'name username email phone company photo.Location')
        const related = await ad.find({_id: {$ne: ads._id},
                                        action: ads.action,
                                        type:ads.type,
                                      })
        return res.status(200).json({
            status:true,
            message:'Ad fetched successfully',
            ads,
            relatedAd:related
        })
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            status:false,
            message:'something went wrong',
        })
    }
}

export const addToWishList = async (req,res) => {
    try {
        const add = await user.findOneAndUpdate({_id:req.user._id}, {
            $addToSet: {wishlist: req.body.adId}
        }, {
            new:true
        })
        const {password, resetCode, ...rest} = add._doc
        res.json(rest)
    } catch (error) {   
        console.log(error)
    }
}

export const removeFromWishList = async (req,res) => {
    try {
        const remove = await user.findOneAndUpdate({_id:req.user._id}, {
            $pull: {wishlist: req.params.wishlist}
        }, {
            new:true
        })
        const {password, resetCode, ...rest} = remove._doc
        res.json(rest)
    } catch (error) {   
        console.log(error)
    }
}