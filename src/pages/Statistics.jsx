import ProgressBar from '../components/ProgressBar.jsx';
import ProgressHeader from '../components/ProgressHeader.jsx';
import './Statistics.css'

function Statistics({technologies, filteredTechs, progress})
{
    return (
        <div className='page'>
            <div className='page-header'>
                <h1>Статистика по изучению технологий</h1>
            </div>
            <div className='statistics'>
                <div className='statistics-section'>
                    <ProgressBar
                        progress={progress}
                        label="Общий прогресс"
                        color="#4CAF50"
                        animated={true}
                        height={20}
                    />
                </div>
                <div className='statistics-section'>
                    <ProgressHeader 
                        countAll={technologies.length}
                        countNotStarted={filteredTechs['not-started'].length} 
                        countInProgress={filteredTechs['in-progress'].length}
                        countCompleted={filteredTechs['completed'].length} 
                    />
                </div>
            </div>
        </div>
    );
}

export default Statistics;