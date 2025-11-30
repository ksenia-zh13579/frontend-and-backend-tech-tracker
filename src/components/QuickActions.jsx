import './QuickActions.css'
import { useState } from 'react';
import Modal from './Modal';

function QuickActions({technologies, onMarkAllCompleted, onResetAll, onChooseNextRandom})
{
    const [showExportModal, setShowExportModal] = useState(false);

    const handleExport = () => {
        const data = {
            exportedAt: new Date().toISOString(),
            technologies: technologies
        };
        const dataStr = JSON.stringify(data, null, 2);
        // Здесь можно добавить логику для скачивания файла
        console.log('Данные для экспорта:', dataStr);
        setShowExportModal(true);
    };

    return (
        <div className='quick-actions'>
            <h2>Быстрые действия</h2>
            <div className="action-buttons">
                <button type='button' onClick={onMarkAllCompleted} className="btn btn-success">
                    ✅ Отметить все как выполненные
                </button>
                <button type='button' onClick={onResetAll} className="btn btn-primary">
                    🔄 Сбросить все статусы
                </button>
                <button type='button' onClick={onChooseNextRandom} className="btn btn-warning">
                    ❓Случайный выбор следующей технологии
                </button>
                <button type='button' onClick={handleExport} className="btn btn-info">
                    📤 Экспорт данных
                </button>
            </div>

            <Modal
                isOpen={showExportModal}
                onClose={() => setShowExportModal(false)}
                title="Экспорт данных"
            >
                <p>Данные успешно подготовлены для экспорта!</p>
                <p>Проверьте консоль разработчика для просмотра данных.</p>
                <button onClick={() => setShowExportModal(false)} className='btn btn-primary'>
                    Закрыть
                </button>
            </Modal>
        </div>
    );
}

export default QuickActions