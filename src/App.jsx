import { useState } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard.jsx';
import ProgressHeader from './components/ProgressHeader.jsx';
import QuickActions from './components/QuickActions.jsx';
import TechFilter from './components/TechFilter.jsx';

function App()
{
  const [filter, setFilter] = useState([0, 2]);

  const [techs, setTechs] = useState([
    {
      id : 1, 
      title : 'HTML', 
      description : 'Изучить основы HTML', 
      statusID : 2
    },
    {
      id : 2, 
      title : 'JSX Syntax', 
      description : 'Освоение синтаксиса JSX', 
      statusID : 1
    },
    {
      id : 3, 
      title : 'State Management', 
      description : 'Работа с состоянием компонентов', 
      statusID : 0
    },
    {
      id : 4, 
      title : 'Effect Manaement', 
      description : 'Работа с менеджером эффектов и контролируемыми полями', 
      statusID : 0
    }
  ]);

  function setStatus(techID, statusID)
  {
    setTechs(prevArr => {
      const techIndex = prevArr.findIndex(tech => tech.id === techID);
      let newArr = prevArr.slice();
      newArr.splice(techIndex, 1, {...(prevArr[techIndex]), statusID : statusID});
      return newArr;
    });
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
        <ul>
          {techs.filter((tech) => tech.statusID >= filter[0] && tech.statusID <= filter[1]).map(tech => (
            <li key={tech.id}>
              <TechnologyCard 
                id={tech.id}
                title={tech.title} 
                description={tech.description} 
                statusID={tech.statusID}
                setStatus={setStatus}
              />
            </li>))}
        </ul>
      </div>
      <QuickActions 
        techs={techs}
        setTechs={setTechs}
        setStatus={setStatus}
      />
    </div>
  );
}

export default App;