import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import useTechnologies from './hooks/useTechnologies';
import useApi from './hooks/useApi';
import Navigation from './components/Navigation';
import RoadmapImporter from './components/RoadmapImporter';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import './App.css';

function App()
{
  const { technologies, updateStatus, updateNotes, progress } = useTechnologies();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTechs = {
    'all' : technologies,
    'not-started' : technologies.filter((tech) => tech.status === 'not-started'),
    'in-progress' : technologies.filter((tech) => tech.status === 'in-progress'),
    'completed' : technologies.filter((tech) => tech.status === 'completed'),
    'query' : technologies.filter(tech =>
      tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  };


  return (
    <Router>
      <div className='app'>
        <Navigation />
        <main className='main-content'>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/' element={<Home />} />
            <Route path='/technologies' element={<TechnologyList 
              technologies={technologies} 
              onStatusChange={updateStatus} 
              onNotesChange={updateNotes}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filteredTechs={filteredTechs}
            />} />
            <Route path='/add-technology' element={<AddTechnology />} />
            <Route path='/technology/:techId' element={<TechnologyDetail 
              technologies={technologies} 
              onStatusChange={updateStatus} 
              onNotesChange={updateNotes}
            />} />
            <Route path='/statistics' element={<Statistics
              technologies={technologies}
              filteredTechs={filteredTechs}
              progress={progress}
            />} />
            <Route path='/settings' element={<Settings 
              technologies={technologies}
              onStatusChange={updateStatus}
            />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 