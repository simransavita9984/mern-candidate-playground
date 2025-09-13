const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  links: [{
    type: String
  }],
  skills: [{
    type: String
  }]
});

const workExperienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  education: [{
    institution: String,
    degree: String,
    year: String
  }],
  skills: [{
    name: String,
    proficiency: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
    }
  }],
  projects: [projectSchema],
  work: [workExperienceSchema],
  links: {
    github: String,
    linkedin: String,
    portfolio: String
  }
}, {
  timestamps: true
});

// Index for search functionality
profileSchema.index({
  'name': 'text',
  'skills.name': 'text',
  'projects.title': 'text',
  'projects.description': 'text'
});

module.exports = mongoose.model('Profile', profileSchema);

