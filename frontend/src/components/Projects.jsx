import { useState, useEffect } from 'react';
import API_BASE_URL from '../apiConfig';
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [skillFilter, setSkillFilter] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const url = skillFilter 
          ? `${API_BASE_URL}/api/projects?skill=${encodeURIComponent(skillFilter)}`
          : `${API_BASE_URL}/api/projects`;
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [skillFilter]);

  const handleFilterChange = (e) => {
    setSkillFilter(e.target.value);
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Projects</h2>
        <div className="mb-4">
          <label htmlFor="skillFilter" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Skill:
          </label>
          <input
            type="text"
            id="skillFilter"
            value={skillFilter}
            onChange={handleFilterChange}
            placeholder="e.g., JavaScript, React"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="space-y-6">
        {projects.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No projects found {skillFilter && `with skill: ${skillFilter}`}
          </div>
        ) : (
          projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-800 mb-1">Skills Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {project.links && project.links.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Links:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.links.map((link, idx) => (
                      <a 
                        key={idx} 
                        href={link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Projects;