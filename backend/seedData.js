const mongoose = require('mongoose');
const Profile = require('./models/Profile');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/me-api');
    
    // Clear existing data
    await Profile.deleteMany({});
    
    
    const profile = new Profile({
      name: "Simran Savita",
      email: "simransavita11@gmail.com",
      education: [
        {
          institution: "Axis Institute of Technology and Management",
          degree: "B.Tech in Information Technology",
          year: "2022 - 2026"
        }
      ],
      skills: [
        { name: "Data Structures & Algorithms", proficiency: "Advanced" },
        { name: "JavaScript", proficiency: "Advanced" },
         { name: "TypeScript", proficiency: "Advanced" },
        { name: "React", proficiency: "Advanced" },
        { name: "Node.js", proficiency: "Intermediate" },
         { name: "Express.js", proficiency: "Intermediate" },
        { name: "Python", proficiency: "Intermediate" },
         { name: "Java", proficiency: "Intermediate" },
        { name: "MongoDB", proficiency: "Intermediate" },
         { name: "MySQL", proficiency: "Advanced" },
        { name: "HTML/CSS", proficiency: "Advanced" }
      ],
      projects: [
        {
          title: "React-Based Classic Board Game",
          description: "Designed and launched a classic board game featuring a responsive user interface that increased player engagement and satisfaction scores by 40%, enhancing the overall gaming experience for over 500 users",
          links: ["https://github.com/simransavita9984/Tic-Tac-Toe-Game"],
          skills: ["React", "Tailwind CSS"]
        },
        {
          title: "Dynamic User Management Portal",
          description: "Developed a React-based user management system implementing CRUD operations via JSONPlaceholder API, enhancing user interaction with simulated POST, PUT, and DELETE requests",
          links: ["https://github.com/simransavita9984/UserDashboard"],
          skills: ["React", "TypeScript", "Tailwind CSS"]
        },
        {
           title: "SkillDossier : Career Mentorship Growth Platform",
          description: "Designed a responsive mentorship platform enabling learners to explore skills, connect with mentors, and access guidance through an interactive dashboard and floating chatbot.",
          links: ["https://github.com/simransavita9984/skilldossier-dev"],
          skills: ["React", "TypeScript", "Tailwind CSS"]
        },
         {
          title: "Grammar Scoring Engine",
          description: "Automated the entire evaluation pipeline by processing raw audio inputs, generating predictions, and exporting results in CSV format, eliminating manual scoring efforts and reducing processing time by 65%",
          links: ["https://github.com/simransavita9984/spoken-grammar-evaluator"],
          skills: ["Python", "Librosa", "NumPy", "Scikit-learn"]
        },
          {
          title: "Smart Pollution Detection Drone",
          description: "Designed sensor-equipped drone that detected pollutants with 90% accuracy using MPU6050 and gas sensors, Implemented IoT connectivity to transmit real-time pollution data for analysis.",
          links: ["https://github.com/simransavita9984/smart-drone"],
          skills: ["Arduino IDE", "C++" , "Sensors", "Microcontroller", "IoT"]
        }
      ],
      work: [
        {
          company: "ClubChat",
          position: "Frontend Developer Intern",
          duration: "July 2025 – Sep. 2025",
          description: "Enhanced blog pages and forms section by developing and implementing user-facing features using Next.js and React.js, improving platform usability and boosting student engagement by 30%. Optimized application performance by debugging frontend issues in collaboration with cross-functional teams"
        }
      ],
      links: {
        github: "https://github.com/simransavita9984",
        linkedin: "https://www.linkedin.com/in/simran-savita/",
        portfolio: "https://updated-portfolio-kappa-rose.vercel.app/"
      }
    });
    
    await profile.save();
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();