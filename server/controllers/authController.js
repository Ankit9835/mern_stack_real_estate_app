import SES from 'aws-sdk/clients/ses.js'
import jwt from 'jsonwebtoken'
import User from '../model/user.js'
import { hashedPassword, comparePassword } from '../helper/auth.js'
import {nanoid} from 'nanoid'
import validator from 'email-validator'

export const welcome = (req,res) => {
    res.json({
        data:'data api'
    })
}

export const preRegister = async (req,res) => {
    try {
        const {email,password} = req.body
        if(!validator.validate(email)){
            return res.json({error:'A valid email is required'})
        }
        if(!password){
            return res.json({error:'Password is required'})
        }
        if(password || password.length < 6){
            return res.json({error:'Password is required with a minimum character of 6'})
        }
        const user = await User.findOne({email})
        if(user){
            return res.json({error:'user email already exists'})
        }
        
        const token = jwt.sign({email,password}, process.env.JWT_SECRET, {
            expiresIn:'1h'
        })
       // console.log('aws key', process.env.AWS_ACCESS_KEY)
        const SESConfig = {
            apiVersion: "2010-12-01",
            accessKeyId: process.env.AWS_ACCESS_KEY,      // should be:  process.env.AWS_ACCESS_ID
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,  
            region: "ap-southeast-2"
        }
        const AWSSES = new SES(SESConfig)
        AWSSES.sendEmail(
            {
              Source: process.env.EMAIL_FROM,
              Destination: {
                ToAddresses: ["ankitsinha874@gmail.com"],
              },
              Message: {
                Body: {
                  Html: {
                    Charset: "UTF-8",
                    Data: `
                      <h1>Welcome to Realist App</h1>
                      <p> Please click the link below to activate your account </p>
                      <a href="${process.env.URL}/auth/activate-account/${token}"> Activate Your Account </a>
                    `,
                  },
                },
                Subject: {
                  Charset: "UTF-8",
                  Data: "Welcome to Realist",
                },
              },
            },
            (err, data) => {
              if (err) {
                console.log(err);
                return res.json({ ok: false });
              } else {
                console.log(data);
                return res.json({ ok: true });
              }
            }
          );
        } 
     catch (error) {
        console.log(error)
        return res.json({
            error:"something went wrong"
        })
    }
}

export const register = async (req,res) => {
    try {
        const {token} = req.body
        console.log('token',token)
        const {email,password} = jwt.verify(token, process.env.JWT_SECRET)
        //console.log('decoded',decoded)
        const hash = await hashedPassword(password)
        const user = await  User.create({
            username:nanoid(6),
            email,
            password:hash,
        })
        const newToken = jwt.sign({_id:user._id}, process.env.JWT_SECRET, {
            expiresIn:'1h'
        })
        const refreshToken = jwt.sign({_id:user._id}, process.env.JWT_SECRET, {
            expiresIn:'7d'
        })
        user.password = undefined
        user.resetCode = undefined

        return res.json({
            newToken,
            refreshToken,
            user
        })
    } catch (error) {
        console.log(error)
    }
}

export const login = async (req,res) => {
    try {
        const {email,password} = req.body
        if(!email || !password){
            return res.json({
                error:'Email and Password are required'
            })
        }
        const user = await User.findOne({email})
        if(!user){
            return res.json({
                error:'No User with this email required'
            })
        }

        const matchedPassword = await comparePassword(password, user.password)
        if(!matchedPassword){
            return res.json({
                error: "wrong password"
            })
        }
        const newToken = jwt.sign({_id:user._id}, process.env.JWT_SECRET, {
            expiresIn:'1h'
        })
        const refreshToken = jwt.sign({_id:user._id}, process.env.JWT_SECRET, {
            expiresIn:'7d'
        })

        user.password = undefined
        user.resetCode = undefined

        return res.json({
            newToken,
            refreshToken,
            user
        })
    } catch (error) {
        console.log(error)
        return res.json({
            error:'Something went wrong'
        })
    }
}