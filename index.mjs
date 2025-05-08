import express from 'express'
import mongoose from 'mogoose'
import dotenv from 'dotenv'
dotenv.config()

//import Schema
import Application from './models/jobApplication.mjs'

const app = express()
const port = process.env.PORT || 3000

//import routes
import applications from './routes/applications.mjs'

//middleware

app.use(express.urlencoded())
app.use(express.json())
app.use(cors())


app.use('/applications', applications)
