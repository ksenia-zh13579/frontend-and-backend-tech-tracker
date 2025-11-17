import './QuickActions.css'

function QuickActions({techs, setTechs, setStatus})
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

    function makeNextRandom(setTechs)
    {
        const stid = getRandomIntInclusive(0, 2);
        const ttl = prompt('Введите название новой технологии:');
        const dscr = prompt('Введите описание новой технологии:');

        setTechs(prevArr => [...prevArr, {
            id : prevArr[prevArr.length - 1].id + 1, 
            title : ttl,
            description : dscr,
            statusID : stid
        }]);
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
            <button type='button' onClick={() => makeNextRandom(setTechs)}>
                Случайный выбор следующей технологии
            </button>
        </div>
    );
}

export default QuickActions