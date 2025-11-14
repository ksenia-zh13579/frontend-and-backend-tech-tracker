import './App.css';
import TechnologyCard from './components/TechnologyCard.jsx';
import ProgressHeader from './components/ProgressHeader.jsx';

function App()
{
  const techs = [
    {id : 1, title : 'HTML', description : 'Изучить основы HTML', status : 'completed'},
    {id : 2, title : 'JSX Syntax', description : 'Освоение синтаксиса JSX', status : 'in-progress'},
    {id : 3, title : 'State Management', description : 'Работа с состоянием компонентов', status : 'not-started'},
    {id : 4, title : 'Effect Manaement', description : 'Работа с менеджером эффектов и контролируемыми полями', status : 'not-started'}
  ];

  return (
    <div className='App'>
      <ProgressHeader countAll={techs.length} countDone={techs.filter((tech) => tech.status === 'completed').length} />
      <div className='tech-list'>
        <h2>Изучаемые технологии:</h2>
        <ul>
          {techs.map(tech => (
            <li key={tech.id}>
              <TechnologyCard 
                title={tech.title} 
                description={tech.description} 
                status={tech.status}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;