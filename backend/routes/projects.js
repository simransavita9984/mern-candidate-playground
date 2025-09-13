const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');


router.get('/', async (req, res) => {
  try {
    const { skill } = req.query;
    console.log('skill filter:', skill);

 
    const profile = await Profile.findOne({});
    
    if (!profile) {
      return res.status(404).json({ message: 'No profile found' });
    }
    
    if (!profile.projects || profile.projects.length === 0) {
      return res.status(404).json({ message: 'No projects found' });
    }

   
    let projects = profile.projects;
    if (skill) {
      const searchSkill = skill.toLowerCase();
      projects = projects.filter(project => {
       
        if (!project.skills || !Array.isArray(project.skills)) {
          return false;
        }
        
        return project.skills.some(s => 
          s.toLowerCase().includes(searchSkill)
        );
      });
    }

  
    if (skill && projects.length === 0) {
      return res.status(404).json({ 
        message: `No projects found with skill: ${skill}`,
        availableSkills: getAvailableSkills(profile.projects)
      });
    }

    res.json(projects);
  } catch (error) {
    console.error('Projects route error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Helper function to get all available skills from projects
function getAvailableSkills(projects) {
  const allSkills = new Set();
  projects.forEach(project => {
    if (project.skills && Array.isArray(project.skills)) {
      project.skills.forEach(skill => {
        allSkills.add(skill.toLowerCase());
      });
    }
  });
  return Array.from(allSkills).sort();
}


router.get('/skills', async (req, res) => {
  try {
    const profile = await Profile.findOne({});
    
    if (!profile || !profile.projects) {
      return res.status(404).json({ message: 'No projects found' });
    }

    const availableSkills = getAvailableSkills(profile.projects);
    res.json(availableSkills);
  } catch (error) {
    console.error('Skills route error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;