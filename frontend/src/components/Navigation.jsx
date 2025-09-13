const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Top Skills' },
    { id: 'search', label: 'Search' },
  ]

  return (
    <nav className="flex justify-center space-x-8 border-b border-gray-300 bg-white">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`
            relative px-5 py-3 font-semibold transition-colors duration-300 ease-in-out
            ${
              activeTab === tab.id
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-blue-500'
            }
          `}
          aria-current={activeTab === tab.id ? 'page' : undefined}
        >
          {tab.label}
         
          {activeTab === tab.id && (
            <span
              className="absolute left-0 bottom-0 w-full h-1 bg-blue-600 rounded-t-md
                         transition-all duration-300 ease-in-out"
            />
          )}
        </button>
      ))}
    </nav>
  )
}

export default Navigation


