import express from 'express'
import mongoose from 'mongoose'
import Application from '../models/jobApplication.mjs'
import { requireAuth } from '../middleware/auth.mjs';

const router = express.Router()
router.use(requireAuth); // protect all below

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

//get route by ID
router.get('/:id', async (req, res)=>{
    try{
        const application = await Application.findById(req.params.id)
        res.json(application)
    }catch (error){
        console.log(error)
    }
})

//put route
router.put('/:id', async (req, res)=> {
    try{
        await Application.findByIdAndUpdate(req.params.id, req.body)
        res.json(Application)
    }catch (error){
        console.log(error)
    }
})

//delete route
router.delete('/:id', async (req, res)=>{
    try {
        await Application.findByIdAndDelete(req.params.id)
        res.json(Application)
    }catch(error){
        console.log(error)
    }
})

export default router