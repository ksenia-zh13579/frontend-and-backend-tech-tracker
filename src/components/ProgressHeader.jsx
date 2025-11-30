import './ProgressHeader.css';

function ProgressHeader({countAll, countNotStarted, countInProgress, countCompleted})
{
    return (
        <div className='progress-header'>
            <h2>Общая статистика</h2>
            <p>Общее количество технологий: {countAll}</p>
            <p>Количество не начатых технологий: {countNotStarted}</p>
            <p>Количество начатых технологий: {countInProgress}</p>
            <p>Количество изученных технологий: {countCompleted}</p>
        </div>
    );
}

export default ProgressHeader;