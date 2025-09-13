const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// Search across profile data
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ message: 'Query parameter "q" is required' });
    }
    
    const profile = await Profile.findOne({
      $text: { $search: q }
    });
    
    if (!profile) {
      return res.status(404).json({ message: 'No results found' });
    }
    
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;