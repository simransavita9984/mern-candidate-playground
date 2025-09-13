import { useState, useEffect } from 'react'
import Profile from './components/Profile'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Search from './components/Search'
import Navigation from './components/Navigation'

function App() {
  const [activeTab, setActiveTab] = useState('profile')

  const renderContent = () => {
    switch(activeTab) {
      case 'profile':
        return <Profile />
      case 'projects':
        return <Projects />
      case 'skills':
        return <Skills />
      case 'search':
        return <Search />
      default:
        return <Profile />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        candidate-playground
        </h1>
        
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="mt-8">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default App

