import { useState } from 'react';
import Modal from '../components/Modal';
import './Settings.css';

function Settings({technologies, onStatusChange})
{
    const [showExportModal, setShowExportModal] = useState(false);
    const [message, setMessage] = useState({
        title : '',
        body : ''
    });

    const getRandomIntInclusive = (min, max) =>
    {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    }

    const markAllCompleted = () => {
        for (let i = 0; i < technologies.length; ++i)
            onStatusChange(technologies[i].id, 'completed');

        setMessage({
            title : 'Завершение обучения',
            body : 'Все технологии успешно отмечены как выполненные! Проверьте страницу технологий, чтобы увидеть результат.'
        });
    }

    const resetAll = () => {
        for (let i = 0; i < technologies.length; ++i)
            onStatusChange(technologies[i].id, 'not-started');

        setMessage({
            title : 'Сброс прогресса',
            body : 'Все технологии успешно отмечены как не начатые! Проверьте страницу технологий, чтобы увидеть результат.'
        });
    }

    const chooseNextRandom = () =>
    {
        const notStartedTechs = technologies.filter((tech) => tech.status === 'not-started');
        if (notStartedTechs.length > 0)
        {
            let nth = getRandomIntInclusive(0, notStartedTechs.length - 1);
            let id = notStartedTechs[nth].id;
            onStatusChange(id, 'in-progress');
            setMessage({
                title : 'Выбор следующего курса',
                body : `Следующим для обучения был выбран курс "${notStartedTechs[nth].title}"! Проверьте страницу технологий, чтобы увидеть результат.`
            });
        }
    }

    const handleExport = () => {
        const data = {
            exportedAt: new Date().toISOString(),
            technologies: technologies
        };
        const dataStr = JSON.stringify(data, null, 2);
        // Здесь можно добавить логику для скачивания файла
        console.log('Данные для экспорта:', dataStr);

        setMessage({
            title : 'Экспорт данных',
            body : 'Данные успешно подготовлены для экспорта! Проверьте консоль разработчика для просмотра данных.'
        });
        setShowExportModal(true);
    };

    return (
        <div className='page'>
            <div className='page-header'>
                <h1>Настройки</h1>
            </div>
            <div className="actions">
                <h2>Быстрые действия</h2>
                <button type='button' onClick={markAllCompleted} className="btn btn-primary">
                    ✅ Отметить все как выполненные
                </button>
                <button type='button' onClick={resetAll} className="btn btn-primary">
                    🔄 Сбросить все статусы
                </button>
                <button type='button' onClick={chooseNextRandom} className="btn btn-primary">
                    ❓Случайный выбор следующей технологии
                </button>
                <button type='button' onClick={handleExport} className="btn btn-primary">
                    📤 Экспорт данных
                </button>
            </div>

            <Modal
                isOpen={showExportModal}
                onClose={() => setShowExportModal(false)}
                title={message.title}
            >
                <p>{message.body}</p>
                <button onClick={() => setShowExportModal(false)} className='btn btn-primary'>
                    Закрыть
                </button>
            </Modal>
        </div>
    );
}

export default Settings;