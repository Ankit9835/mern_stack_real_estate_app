export const welcome = (req,res) => {
    res.json({
        data:'data api'
    })
}

export const preRegister = async (req,res) => {
    try {
        const {email,password} = req.body
        console.log(email)
    } catch (error) {
        console.log(error)
        return res.json({
            error:"something went wrong"
        })
    }
}