import { useState, useEffect } from 'react'

const Skills = () => {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTopSkills = async () => {
      try {
        const response = await fetch('/api/skills/top')
        if (!response.ok) {
          throw new Error('Failed to fetch skills')
        }
        const data = await response.json()
        setSkills(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTopSkills()
  }, [])

  if (loading) return <div className="text-center">Loading...</div>
  if (error) return <div className="text-center text-red-500">Error: {error}</div>

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Top Skills</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {skills.map((skill, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">{skill.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                skill.proficiency === 'Expert' ? 'bg-green-100 text-green-800' :
                skill.proficiency === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                skill.proficiency === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {skill.proficiency}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  skill.proficiency === 'Expert' ? 'bg-green-500' :
                  skill.proficiency === 'Advanced' ? 'bg-blue-500' :
                  skill.proficiency === 'Intermediate' ? 'bg-yellow-500' :
                  'bg-gray-500'
                }`}
                style={{
                  width: `${
                    skill.proficiency === 'Expert' ? 100 :
                    skill.proficiency === 'Advanced' ? 80 :
                    skill.proficiency === 'Intermediate' ? 60 : 40
                  }%`
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skills