import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import useTechnologies from './useTechnologies.js';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import Navigation from './components/Navigation';
import Statistics from './pages/Statistics.jsx';
import Settings from './pages/Settings.jsx';
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

/* import { useState } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard.jsx';
import ProgressHeader from './components/ProgressHeader.jsx';
import QuickActions from './components/QuickActions.jsx';
import TechFilter from './components/TechFilter.jsx';
import useTechnologies from './useTechnologies.js';
import ProgressBar from './components/ProgressBar.jsx';

function App()
{
  const { technologies, updateStatus, updateNotes, progress } = useTechnologies();

  const [filter, setFilter] = useState('all');

  const [searchQuery, setSearchQuery] = useState('');

  const filteredTechs = {
    'all' : technologies,
    'not-started' : technologies.filter((tech) => tech.status === 'not-started'),
    'in-progress' : technologies.filter((tech) => tech.status === 'in-progress'),
    'completed' : technologies.filter((tech) => tech.status === 'completed'),
    'query' : technologies.filter(tech =>
      tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  };

  const getRandomIntInclusive = (min, max) =>
    {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    }

  const markAllCompleted = () => {
    for (let i = 0; i < technologies.length; ++i)
    {
      updateStatus(technologies[i].id, 'completed');
    }
  }

  const resetAll = () => {
    for (let i = 0; i < technologies.length; ++i)
      updateStatus(technologies[i].id, 'not-started');
  }

  const chooseNextRandom = () =>
  {
      if (filteredTechs['not-started'].length > 0)
      {
          let nth = getRandomIntInclusive(0, filteredTechs['not-started'].length - 1);
          let id = filteredTechs['not-started'][nth].id;
          updateStatus(id, 'in-progress');
      }
  }
  
  return (
    <div className='app'>
      <header className="app-header">
        <h1>Трекер изучения технологий</h1>
        <ProgressBar
          progress={progress}
          label="Общий прогресс"
          color="#4CAF50"
          animated={true}
          height={20}
        />
      </header>

      <ProgressHeader 
        countAll={technologies.length}
        countNotStarted={filteredTechs['not-started'].length} 
        countInProgress={filteredTechs['in-progress'].length}
        countCompleted={filteredTechs['completed'].length} 
      />

      <main className="app-main">
        <h2>Изучаемые технологии</h2>

        <TechFilter setFilter={setFilter} />

        <div className="search-box">
          <h3>Поиск технологий</h3>
          <span>🔎</span>
          <input
            name='search'
            type="text"
            placeholder="Поиск технологий..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDownCapture={(e) => {
              if (!e.isComposing && e.keyCode !== 229 && e.code === 'Enter')
              {
                setFilter('query');
                e.target.parentElement.querySelector('.query-num').style.display = 'inline';
              }
            }}
          />
          <span className='query-num'>Найдено: {filteredTechs['query'].length}</span>
        </div>

        <div className="technologies-grid">
          {filteredTechs[filter].map(tech => (
              <TechnologyCard
                key={tech.id} 
                tech={tech}
                onStatusChange={updateStatus}
                onNotesChange={updateNotes}
              />
          ))}
        </div>

        <QuickActions 
          technologies={technologies}
          onMarkAllCompleted={markAllCompleted}
          onResetAll={resetAll}
          onChooseNextRandom={chooseNextRandom}
        />

      </main>
    </div>
  );
}

export default App; */