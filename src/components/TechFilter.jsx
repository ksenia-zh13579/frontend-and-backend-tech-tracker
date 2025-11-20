import './TechFilter.css'

function TechFilter({setFilter})
{
    return (
        <div className='tech-filter'>
            <input type='radio' name='filter-group' id='filterAll' value='all' 
            onClick={() => setFilter([0, 2])} />
            <label htmlFor='filterAll' className='btnAll'>Все</label>
            <input type='radio' name='filter-group' id='filterNonStarted' value='nonStarted' 
            onClick={() => setFilter([0, 0])} />
            <label htmlFor='filterNonStarted' className='btnNonStarted'>Не начатые</label>
            <input type='radio' name='filter-group' id='filterInProgress' value='inProgress' 
            onClick={() => setFilter([1, 1])} />
            <label htmlFor='filterInProgress' className='btnInProgress'>В процессе</label>
            <input type='radio' name='filter-group' id='filterCompleted' value='completed' 
            onClick={() => setFilter([2, 2])} />
            <label htmlFor='filterCompleted' className='btnCompleted'>Завершенные</label>
        </div>
    );
}

export default TechFilter