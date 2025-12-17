import { useState } from 'react';
import Modal from '../components/Modal';
import './Settings.css';

function Settings({technologies, onStatusChange, addTechnology})
{
    const [showExportModal, setShowExportModal] = useState(false);
    const [message, setMessage] = useState({
        title : '',
        body : ''
    });

    const [isDragging, setIsDragging] = useState(false);

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
        const dataStr = JSON.stringify(technologies, null, 2);
        
        // Логика для скачивания файла
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const exportFileDefaultName = `tech-tracker-${new Date().toISOString().split('T')[0]}.json`;
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', url);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        URL.revokeObjectURL(url);
        console.log('Данные для экспорта:', dataStr);

        setMessage({
            title : 'Экспорт данных',
            body : `Экспортировано ${technologies.length} технологий! Проверьте консоль разработчика для просмотра данных.`
        });
        setShowExportModal(true);
    };

    const handleImport = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = async (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                console.log(imported);

                if (!Array.isArray(imported))
                    throw new Error('Неверный формат данных!');

                for (const tech of imported)
                {
                    await addTechnology(tech);
                }

                setMessage({
                    title : 'Импорт данных',
                    body : `Импортировано ${technologies.length} технологий!`
                });
            } catch(error) {
                setMessage({
                    title : 'Импорт данных',
                    body : `Ошибка импорта: неверный формат файла: ${error}!`
                });
            }
        };

        reader.readAsText(file);
        e.target.value = '';
        setShowExportModal(true);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    }

    const handleDragLeave = () => {
        setIsDragging(false);
    }

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];

        if (file && file.type === 'application/json')
        {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const imported = JSON.parse(e.target.result);

                    if (!Array.isArray(imported))
                        throw new Error('Неверный формат данных!');

                    for (const tech of imported)
                        addTechnology(tech);

                    setMessage({
                        title : 'Импорт данных',
                        body : `Импортировано ${technologies.length} технологий!`
                    });
                } catch(error) {
                    setMessage({
                        title : 'Импорт данных',
                        body : `Ошибка импорта: неверный формат файла: ${error}!`
                    });
                }
            };

            reader.readAsText(file);
            setShowExportModal(true);
        }
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
                    📤 Экспорт данных в JSON-файл
                </button>
                <label className='btn btn-primary file-input-label'>
                    📥 Импорт данных из JSON-файла
                    <input 
                        type='file'
                        accept='.json'
                        onChange={handleImport}
                        style={{display : 'none'}}
                    />
                </label>
                <div
                    className={`drop-zone ${isDragging ? 'dragging' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    Перетащите JSON-файл сюда
                </div>
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