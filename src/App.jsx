import { useState, useEffect } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard.jsx';
import ProgressHeader from './components/ProgressHeader.jsx';
import QuickActions from './components/QuickActions.jsx';
import TechFilter from './components/TechFilter.jsx';

function App()
{
  const initialTechs = [
    {
      id : 1, 
      title : 'HTML', 
      description : 'Изучить основы HTML', 
      statusID : 2,
      notes : ''
    },
    {
      id : 2, 
      title : 'JSX Syntax', 
      description : 'Освоение синтаксиса JSX', 
      statusID : 1,
      notes : ''
    },
    {
      id : 3, 
      title : 'State Management', 
      description : 'Работа с состоянием компонентов', 
      statusID : 0,
      notes : ''
    },
    {
      id : 4, 
      title : 'Effect Management', 
      description : 'Работа с менеджером эффектов и контролируемыми полями', 
      statusID : 0,
      notes : ''
    }
  ];

  const [techs, setTechs] = useState(() => {
    const saved = localStorage.getItem('techTrackerData');
    if (saved) {
      console.log('Данные загружены из localStorage');
      return JSON.parse(saved);
    }
    return initialTechs;
  }
  );

  function setStatus(techID, statusID)
  {
    setTechs(prevArr => {
      const techIndex = prevArr.findIndex(tech => tech.id === techID);
      let newArr = prevArr.slice();
      newArr.splice(techIndex, 1, {...(prevArr[techIndex]), statusID : statusID});
      return newArr;
    });
  }

  const [filter, setFilter] = useState('all');

  const [searchQuery, setSearchQuery] = useState('');

  const filteredTechs = {
    'all' : techs,
    'not-started' : techs.filter((tech) => tech.statusID === 0),
    'in-progress' : techs.filter((tech) => tech.statusID === 1),
    'completed' : techs.filter((tech) => tech.statusID === 2),
    'query' : techs.filter(tech =>
      tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  };

  useEffect(() => {
    localStorage.setItem('techTrackerData', JSON.stringify(techs));
    console.log('Данные сохранены в localStorage');
  }, [techs]);

  const updateTechnologyNotes = (techId, newNotes) => {
    setTechs(prevTech =>
      prevTech.map(tech =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  }

  return (
    <div className='App'>
      <ProgressHeader 
        countAll={techs.length}
        countNotStarted={techs.filter((tech) => tech.statusID === 0).length} 
        countInProgress={techs.filter((tech) => tech.statusID === 1).length}
        countCompleted={techs.filter((tech) => tech.statusID === 2).length} 
      />
      <div className='tech-list'>
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
        <ul>
          {filteredTechs[filter].map(tech => (
            <li key={tech.id}>
              <TechnologyCard 
                id={tech.id}
                title={tech.title} 
                description={tech.description} 
                statusID={tech.statusID}
                setStatus={setStatus}
                notes={tech.notes}
                onNotesChange={updateTechnologyNotes}
              />
            </li>
          ))}
        </ul>
      </div>
      <QuickActions 
        techs={techs}
        setStatus={setStatus}
      />
    </div>
  );
}

export default App;