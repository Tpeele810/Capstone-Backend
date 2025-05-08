import express from 'express'
import mongoose from 'mongoose'
import Application from '../models/jobApplication.mjs'

const router = express.Router()


//Get route
router.get('/', async (req, res)=>{
    try{
        const applications = await Application.find()
        res.json(applications)
    }catch(err){
        console.log(err)
    }
})

//Post route
router.post('/', async (req,res)=>{
    try{
        await Application.create(req.body)
        res.json(Application)
    }catch(error){
        console.log(error)
    }
})