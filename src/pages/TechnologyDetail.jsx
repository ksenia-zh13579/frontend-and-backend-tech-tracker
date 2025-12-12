import { useParams, Link } from 'react-router-dom';
import TechnologyNotes from '../components/TechnologyNotes';
import AddEditTechnology from '../components/AddEditTechnology';
import './TechnologyDetail.css'

function TechnologyDetail({technologies, onStatusChange, onNotesChange, showForm, editingTech, onSaveTechnology, onEdit, onCancel}) {
    const { techId } = useParams();

    const technology = technologies.find(tech => tech.id === Number(techId));
    
    if (technology === undefined) {
        return (
            <div className="page">
                <h1>Технология не найдена</h1>
                <p>Технология с ID {techId} не существует.</p>
                <Link to="/technologies" className="btn">
                    ← Назад к списку
                </Link>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="page-header">
                <Link to="/technologies" className="back-link">
                    ← Назад к списку
                </Link>
                <h1>{technology.title}</h1>
            </div>
            <div className={`technology-detail ${technology.status}`}>
                <div className="detail-section">
                    <h3>Описание</h3>
                    <p>{technology.description}</p>
                </div>
                <div className="detail-section">
                    <h3>Категория</h3>
                    <p>{technology.category}</p>
                </div>
                <div className="detail-section">
                    <h3>Уровень</h3>
                    <p>{technology.difficulty}</p>
                </div>
                <div className="detail-section">
                    <h3>Статус изучения</h3>
                    <div className="status-buttons">
                        <button
                            onClick={() => onStatusChange(technology.id, 'not-started')}
                            className={technology.status === 'not-started' ? 'active' : ''}
                        >
                            Не начато
                        </button>
                        <button
                            onClick={() => onStatusChange(technology.id, 'in-progress')}
                            className={technology.status === 'in-progress' ? 'active' : ''}
                        >
                            В процессе
                        </button>
                        <button
                            onClick={() => onStatusChange(technology.id, 'completed')}
                            className={technology.status === 'completed' ? 'active' : ''}
                        >
                            Завершено
                        </button>
                    </div>
                </div>
                <div className="detail-section">
                    <TechnologyNotes
                        notes={technology.notes}
                        onNotesChange={onNotesChange} 
                        techId={technology.id}
                    />
                </div>
                <div className="detail-section">
                    <h3>Ресурсы</h3>
                    <ul className="tech-resources">
                        {technology.resources.map(resource =>
                        <li key={resource.length}>
                            <a href={resource} className='tech-resource'>{resource}</a>
                        </li> 
                        )}
                    </ul>
                </div>
                <div className="detail-section">
                    <button 
                        onClick={() => onEdit(technology)}
                        className='btn btn-info '
                    >
                        Редактировать
                    </button>
                </div>

                {/* Форма добавления/редактирования */}
                {showForm && (
                    <div className="form-modal">
                        <div className="modal-window">
                            <AddEditTechnology
                                onSave={onSaveTechnology}
                                onCancel={onCancel}
                                initialData={editingTech || {}}
                            />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default TechnologyDetail;