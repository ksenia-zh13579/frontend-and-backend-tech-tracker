import './ProgressHeader.css';

function ProgressHeader({countAll, countDone})
{
    const percentDone = Number(countDone * 100 / countAll);

    return (
        <div className='progress-header'>
            <h2>Общая статистика</h2>
            <p>Общее количество технологий: {countAll}</p>
            <p>Количество изученных технологий: {countDone}</p>
            <label for='progress'>Процент выполнения: </label>
            <span> {percentDone} %</span>
            <progress id='progress' max='100' value={percentDone}>{percentDone} %</progress>
        </div>
    );
}

export default ProgressHeader;