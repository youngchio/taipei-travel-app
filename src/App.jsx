import { useState } from 'react'
import './App.css'
import HomeTab from './components/tabs/HomeTab'
import CourseMakerTab from './components/tabs/CourseMakerTab'
import TaipeiNowTab from './components/tabs/TaipeiNowTab'
import LocalInsightsTab from './components/tabs/LocalInsightsTab'
import MyTripTab from './components/tabs/MyTripTab'
import GNB from './components/GNB'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab />
      case 'course-maker':
        return <CourseMakerTab />
      case 'taipei-now':
        return <TaipeiNowTab />
      case 'local-insights':
        return <LocalInsightsTab />
      case 'my-trip':
        return <MyTripTab />
      default:
        return <HomeTab />
    }
  }

  return (
    <div className="app-container" style={{ backgroundColor: '#fff', minHeight: '100vh', color: '#333' }}>
      <main style={{ paddingBottom: '60px' }}>
        {renderContent()}
      </main>
      <GNB activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

export default App
