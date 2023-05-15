import express from "express"
import * as dotenv from 'dotenv'
dotenv.config()
import connectDB from "./config/dbConfig.js" 
import morgan from "morgan"
import cors from "cors"
import authRoutes from './routes/auth.js'
import adsRoutes from './routes/ads.js'

const app = express()

// middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api', authRoutes)
app.use('/api', adsRoutes)

const port = process.env.port || 5000

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`server is listening to ${port} no`)
        })
    } catch (err) {
        console.log(err)
    }
    
}

start()