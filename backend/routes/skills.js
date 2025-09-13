const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// GET top skills
router.get('/top', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    const sortedSkills = profile.skills.sort((a, b) => {
      const proficiencyOrder = { 'Expert': 4, 'Advanced': 3, 'Intermediate': 2, 'Beginner': 1 };
      return proficiencyOrder[b.proficiency] - proficiencyOrder[a.proficiency];
    });
    
    // Get top 5 skills
    const topSkills = sortedSkills.slice(0, 5);
    
    res.json(topSkills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;