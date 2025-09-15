import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaGlobe, FaGraduationCap, FaBriefcase, FaCode } from 'react-icons/fa';
import API_BASE_URL from '../apiConfig';
const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/profile`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="text-center py-10 text-gray-600 font-semibold">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500 font-semibold">Error: {error}</div>;
  if (!profile) return <div className="text-center py-10 text-gray-500">No profile data found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
        
       
        <div className="relative p-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <h2 className="text-4xl font-extrabold mb-1">{profile.name}</h2>
          <p className="text-xl font-light opacity-80">{profile.email}</p>
          
          <div className="flex justify-center space-x-6 mt-6">
            {profile.links.github && (
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="text-white hover:scale-110 transform transition-transform duration-300">
                <FaGithub className="w-8 h-8" />
              </a>
            )}
            {profile.links.linkedin && (
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:scale-110 transform transition-transform duration-300">
                <FaLinkedin className="w-8 h-8" />
              </a>
            )}
            {profile.links.portfolio && (
              <a href={profile.links.portfolio} target="_blank" rel="noopener noreferrer" className="text-white hover:scale-110 transform transition-transform duration-300">
                <FaGlobe className="w-8 h-8" />
              </a>
            )}
          </div>
        </div>

       
        <div className="p-8 grid md:grid-cols-2 gap-8">
          
         
          <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100 transform transition-transform duration-300 hover:scale-[1.02]">
            <div className="flex items-center text-blue-600 mb-4">
              <FaGraduationCap className="w-6 h-6 mr-3" />
              <h3 className="text-2xl font-semibold">Education</h3>
            </div>
            {profile.education.map((edu, index) => (
              <div key={index} className="mb-5 p-4 bg-white rounded-md border border-gray-200 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-lg text-gray-800">{edu.institution}</h4>
                <p className="text-gray-600 mt-1">{edu.degree} <span className="text-sm text-gray-400 font-light">({edu.year})</span></p>
              </div>
            ))}
          </div>

          
          <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100 transform transition-transform duration-300 hover:scale-[1.02]">
            <div className="flex items-center text-purple-600 mb-4">
              <FaBriefcase className="w-6 h-6 mr-3" />
              <h3 className="text-2xl font-semibold">Work Experience</h3>
            </div>
            {profile.work.map((job, index) => (
              <div key={index} className="mb-5 p-4 bg-white rounded-md border border-gray-200 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-lg text-gray-800">{job.company}</h4>
                <p className="text-gray-600 mt-1">{job.position} <span className="text-sm text-gray-400 font-light">({job.duration})</span></p>
                <p className="text-sm text-gray-500 mt-2">{job.description}</p>
              </div>
            ))}
          </div>
        </div>

    
        <div className="p-8 border-t border-gray-100">
          <div className="flex items-center text-green-600 mb-4">
            <FaCode className="w-6 h-6 mr-3" />
            <h3 className="text-2xl font-semibold">Skills</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {profile.skills.map((skill, index) => (
              <span key={index} className="px-5 py-2 bg-green-100 text-green-800 rounded-full font-medium text-sm transition-all duration-300 hover:bg-green-200 hover:scale-105 hover:shadow-md">
                {skill.name} <span className="font-normal text-green-600">({skill.proficiency})</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;