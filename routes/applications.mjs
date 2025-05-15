import express from 'express'
import mongoose from 'mongoose'
import Application from '../models/jobApplication.mjs'
import { requireAuth } from '../middleware/auth.mjs';

const router = express.Router()
router.use(requireAuth); // protect all below

//Get route
// router.get('/', async (req, res)=>{
//     try{
//         const applications = await Application.find()
//         res.json(applications)
//     }catch(err){
//         console.log(err)
//     }
// })

router.get('/', requireAuth, async (req, res) => {
  try {
    // Only return applications where user === logged-in user's id
    const apps = await Application.find({ user: req.user._id });
    res.json(apps);
  } catch (err) {
    console.error('Error fetching user apps:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

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

router.get('/:id', requireAuth, async (req, res) => {
  try {
    const application = await Application.findOne({ _id: req.params.id, user: req.user._id });
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

//put route
// router.put('/:id', async (req, res)=> {
//     try{
//         await Application.findByIdAndUpdate(req.params.id, req.body)
//         res.json(Application)
//     }catch (error){
//         console.log(error)
//     }
// })

router.put('/:id', requireAuth, async (req, res) => {
  try {
    // Find the application and ensure it belongs to the logged-in user
    const application = await Application.findOne({ _id: req.params.id, user: req.user._id });

    if (!application) {
      return res.status(404).json({ error: 'Application not found or not authorized' });
    }

    // Update the allowed fields
    Object.assign(application, req.body);

    const updated = await application.save();
    res.json(updated);
  } catch (error) {
    console.error('Update failed:', error);
    res.status(500).json({ error: 'Server error during update' });
  }
});


//delete route
// router.delete('/:id', async (req, res)=>{
//     try {
//         await Application.findByIdAndDelete(req.params.id)
//         res.json(Application)
//     }catch(error){
//         console.log(error)
//     }
// })

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const application = await Application.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!application) {
      return res.status(404).json({ error: 'Application not found or not authorized' });
    }

    res.json({ message: 'Application deleted' });
  } catch (error) {
    console.error('Delete failed:', error);
    res.status(500).json({ error: 'Server error during delete' });
  }
});
export default router