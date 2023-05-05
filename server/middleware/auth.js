import jwt from 'jsonwebtoken'

export const requireSignIn = (req,res,next) => {
    try {
        const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        console.log(error)
        res.json({
            error:'invalid or expired token'
        })
    }
}