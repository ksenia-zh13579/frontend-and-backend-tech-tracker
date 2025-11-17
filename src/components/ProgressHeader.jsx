import './ProgressHeader.css';

function ProgressHeader({countAll, countNotStarted, countInProgress, countCompleted})
{
    const percentDone = Number(countCompleted * 100 / countAll);

    return (
        <div className='progress-header'>
            <h2>Общая статистика</h2>
            <p>Общее количество технологий: {countAll}</p>
            <p>Количество не начатых технологий: {countNotStarted}</p>
            <p>Количество начатых технологий: {countInProgress}</p>
            <p>Количество изученных технологий: {countCompleted}</p>
            <label htmlFor='progress'>Процент выполнения: </label>
            <span> {percentDone} %</span>
            <progress id='progress' max='100' value={percentDone}>{percentDone} %</progress>
        </div>
    );
}

export default ProgressHeader;