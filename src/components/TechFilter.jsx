import './TechFilter.css'

function TechFilter({setFilter})
{
    return (
        <div className='tech-filter'>
            <input type='radio' name='filter-group' id='filterAll' value='all' 
            onClick={() => setFilter('all')} />
            <label htmlFor='filterAll' className='btnAll'>Все</label>
            <input type='radio' name='filter-group' id='filterNonStarted' value='nonStarted' 
            onClick={() => setFilter('not-started')} />
            <label htmlFor='filterNonStarted' className='btnNonStarted'>Не начатые</label>
            <input type='radio' name='filter-group' id='filterInProgress' value='inProgress' 
            onClick={() => setFilter('in-progress')} />
            <label htmlFor='filterInProgress' className='btnInProgress'>В процессе</label>
            <input type='radio' name='filter-group' id='filterCompleted' value='completed' 
            onClick={() => setFilter('completed')} />
            <label htmlFor='filterCompleted' className='btnCompleted'>Завершенные</label>
        </div>
    );
}

export default TechFilter