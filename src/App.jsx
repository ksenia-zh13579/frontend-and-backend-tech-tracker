import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
//import useTechnologies from './hooks/useTechnologies';
import useTechnologiesApi from './hooks/useTechnologiesApi';
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
  //const { technologies, updateStatus, updateNotes, progress } = useTechnologies();
  const BIN_ID = '6938263243b1c97be9e2023f';
  const MASTER_KEY = '$2a$10$FAr4j8Ltb.FeZkv8je8/uuAujPUdGHEwt4QypejDa2nsOaAkiDpGS';

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-Master-Key", MASTER_KEY);
  myHeaders.append("X-Bin-Meta", "false");

  const { 
    technologies, 
    updateStatus, 
    updateNotes, 
    progress, 
    loading, 
    error, 
    refetch, 
    addTechnology, 
    addResource 
  } = useTechnologiesApi(
      `https://api.jsonbin.io/v3/b/${BIN_ID}`, 
      { headers: myHeaders }
  );
  
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

  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
        <p>Загрузка технологий...</p>
      </div>
    );
  }
  
  return (
    <Router>
      <div className='app'>
        <Navigation />
        <header className="app-header">
          <h1>🚀 Трекер изучения технологий</h1>
          <button onClick={refetch} className="retry-button">
            Обновить
          </button>
        </header>

        {error && (
          <div className="app-error">
            <p>{error}</p>
            <button className='retry-button' onClick={refetch}>Попробовать снова</button>
          </div>
        )}
        
        <main className='main-content'>
          <RoadmapImporter
            error={error}
            addTechnology={addTechnology}
          />
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
              onAddResource={addResource}
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

/*import { useState } from 'react';
import useTechnologiesApi from './hooks/useTechnologiesApi';
import RoadmapImporter from './components/RoadmapImporter';
import TechnologyList from './pages/TechnologyList';

function App() {
  const { technologies, updateStatus, updateNotes, progress, loading, error, refetch, addData } = useTechnologiesApi();

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

  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
        <p>Загрузка технологий...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 Трекер изучения технологий</h1>
        <button onClick={refetch} className="refresh-btn">
          Обновить
        </button>
      </header>

      {error && (
        <div className="app-error">
          <p>{error}</p>
          <button onClick={refetch}>Попробовать снова</button>
        </div>
      )}

      <main className="app-main">
        <RoadmapImporter />
        
      </main>
    </div>
  );
}

export default App; */