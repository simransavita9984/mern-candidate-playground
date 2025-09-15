import { useState } from 'react'
import API_BASE_URL from '../apiConfig';
const Search = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE_URL}/api/search?q=${encodeURIComponent(query)}`)
      if (!response.ok) {
        throw new Error('Search failed')
      }
      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Search Profile</h2>
        
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for skills, projects, etc."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {results && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Search Results</h3>
          
          <div className="mb-6">
            <h4 className="font-medium text-gray-800 mb-2">Profile</h4>
            <p><span className="font-semibold">Name:</span> {results.name}</p>
            <p><span className="font-semibold">Email:</span> {results.email}</p>
          </div>

          {results.skills && results.skills.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {results.skills.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {skill.name} ({skill.proficiency})
                  </span>
                ))}
              </div>
            </div>
          )}

          {results.projects && results.projects.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-2">Projects</h4>
              <div className="space-y-4">
                {results.projects.map((project, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h5 className="font-semibold text-gray-800">{project.title}</h5>
                    <p className="text-gray-600">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.education && results.education.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-2">Education</h4>
              <div className="space-y-2">
                {results.education.map((edu, index) => (
                  <div key={index}>
                    <h5 className="font-semibold text-gray-800">{edu.institution}</h5>
                    <p className="text-gray-600">{edu.degree} ({edu.year})</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Search