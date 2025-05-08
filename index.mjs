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


import fs from 'fs'

//Read the Json file
fs.readFile('/data/seed.json', 'utf8', (err, data)=>{
    if(err){
        console.log ('Error reading the file:', err)
        return
    }
    //Parse the Json data
    const seed = Json.parse(data)

    //use the seed data
    console.log(seed)

    //mogoose
    mongoose.connect(process.env.ATLAS_URI)
    .then (()=>{
        console.log('Database connected')

        //Insert applications
        Application.insertMany(seed.applications)
        .then(()=>console.log('Applications seeded'))
        .catch(err => console.log('Error seeding', err))

    })
})

//routes

app.get('/', (req,res)=>{
    res.send('Welcome to My Job Application Tracker')

})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})