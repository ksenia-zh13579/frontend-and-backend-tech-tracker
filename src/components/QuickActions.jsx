import './QuickActions.css'

function QuickActions({techs, setStatus})
{
    function getRandomIntInclusive(min, max) 
    {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    }

    function makeComplete(techs, setStatus)
    {
        for (let tech of techs)
        {
            setStatus(tech.id, 2);
        }
    }

    function makeNonStarted(techs, setStatus)
    {
        for (let tech of techs)
        {
            setStatus(tech.id, 0);
        }
    }

    function makeNextRandom(techs, setStatus)
    {
        let nonStartedTechs = techs.filter(tech => tech.statusID === 0);
        if (nonStartedTechs.length > 0)
        {
            let nth = getRandomIntInclusive(0, nonStartedTechs.length - 1);
            let id = nonStartedTechs[nth].id;
            setStatus(id, 1);
        }
    }

    return (
        <div className='quick-actions'>
            <h2>Быстрые действия</h2>
            <button type='button' onClick={() => makeComplete(techs, setStatus)}>
                Отметить все как выполненные
            </button>
            <button type='button' onClick={() => makeNonStarted(techs, setStatus)}>
                Сбросить все статусы
            </button>
            <button type='button' onClick={() => makeNextRandom(techs, setStatus)}>
                Случайный выбор следующей технологии
            </button>
        </div>
    );
}

export default QuickActions