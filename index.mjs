import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
//import Schema
import Application from './models/jobApplication.mjs'



const app = express()
const port = process.env.PORT || 5000

//import routes
import applications from './routes/applications.mjs'
import authRoutes from './routes/auth.mjs';
//middleware

app.use(express.urlencoded())
app.use(express.json())
app.use(cors())



app.use('/applications', applications)
app.use('/auth', authRoutes)

//mogoose
mongoose.connect(process.env.ATLAS_URI)



//routes

app.get('/', (req,res)=>{
    res.send('Welcome to My Job Application Tracker')

})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})