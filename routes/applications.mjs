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
router.post('/', async (req, res) => {
    try {
      req.body.user = req.user._id;
      const newApp = new Application(req.body);
      const saved = await newApp.save();
      res.status(201).json(saved);
    } catch (err) {
      console.error('Failed to create application:', err);
      res.status(400).json({ error: 'Invalid application data' });
    }
  });

//get route by ID
// router.get('/:id', async (req, res)=>{
//     try{
//         const application = await Application.findById(req.params.id)
//         res.json(application)
//     }catch (error){
//         console.log(error)
//     }
// })

router.get('/', requireAuth, async (req, res) => {
  try {
    // Only fetch applications belonging to the logged-in user
    const applications = await Application.find({ user: req.user._id });
    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching applications' });
  }
});

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