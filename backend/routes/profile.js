// const express = require('express');
// const router = express.Router();
// const Profile = require('../models/Profile');

// // GET profile
// router.get('/', async (req, res) => {
//   try {
//     const profile = await Profile.findOne();
//     res.json(profile);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // UPDATE profile
// router.put('/', async (req, res) => {
//   try {
//     // In a real app, you'd add authentication here
//     const profile = await Profile.findOneAndUpdate({}, req.body, { 
//       new: true, 
//       upsert: true // Create if doesn't exist
//     });
//     res.json(profile);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// GET profile - READ
router.get('/', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE profile - POST 
router.post('/', async (req, res) => {
  try {
    // Check if profile already exists
    const existingProfile = await Profile.findOne();
    if (existingProfile) {
      return res.status(400).json({ 
        message: 'Profile already exists' 
      });
    }

    // Create new profile
    const profile = new Profile(req.body);
    const savedProfile = await profile.save();
    
    res.status(201).json({
      message: 'Profile created successfully',
      profile: savedProfile
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE profile - PUT
router.put('/', async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate({}, req.body, { 
      new: true, 
      upsert: true 
    });
    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;


