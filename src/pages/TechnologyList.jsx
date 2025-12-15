import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TechnologyCard from '../components/TechnologyCard.jsx';
import TechFilter from '../components/TechFilter.jsx';
import SearchBox from '../components/SearchBox.jsx';
import SearchTechnologies from '../components/SearchTechnologies.jsx';
import AddEditTechnology from '../components/AddEditTechnology.jsx';
import EditStatuses from '../components/EditStatuses.jsx';
import './TechnologyList.css'

function TechnologyList({ technologies, onStatusChange, onNotesChange, searchQuery, setSearchQuery, filteredTechs, showForm, editingTech, onSaveTechnology, onCancel, handleShowForm }) 
{
    const [filter, setFilter] = useState('all');
    const [showEditStatuses, setShowEditStatuses] = useState(false);

    useEffect(() => {
        if (showEditStatuses) {
            document.querySelector('.edit-statuses-form').focus({ focusVisible: true, preventScroll: false });
        }
        else {
            let btnEditStatuses = document.getElementById('btnEditStatuses');
            if (btnEditStatuses)
                btnEditStatuses.focus({ focusVisible: true, preventScroll: false });
        }
    }, [showEditStatuses]);

    const handleCancelEditStatuses = () => {
        setShowEditStatuses(false);
    }

    return (
        <div className="page">
            <div className="page-header">
                <h1>Все технологии</h1>
                <button 
                    onClick={handleShowForm}
                    className="btn btn-primary"
                    id='btnAddEditTechnology'
                >
                    + Добавить технологию
                </button>
            </div>
            {technologies.length > 0 ? (
                <>
                    <div className='actions-section'>
                        <SearchBox
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            setFilter={setFilter}
                            filteredTechs={filteredTechs}
                        />
                        <TechFilter setFilter={setFilter}/>
                        <button 
                            onClick={() => setShowEditStatuses(true)} 
                            className='btn btn-info'
                            id='btnEditStatuses'
                        >
                            Изменить статусы
                        </button>
                        {showEditStatuses && 
                            <EditStatuses 
                                technologies={technologies}
                                onStatusChange={onStatusChange}
                                onCancel={handleCancelEditStatuses}
                            />
                        }

                    </div>
                    <div className="technologies-grid">
                        {filteredTechs[filter].map(tech => (
                            <TechnologyCard 
                                key={tech.id}
                                tech={tech} 
                                onStatusChange={onStatusChange} 
                                onNotesChange={onNotesChange}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <div className="empty-state">
                    <p>Технологий пока нет.</p>
                    <button 
                        onClick={handleShowForm}
                        className="btn btn-primary"
                        id='btnAddEditTechnology'
                    >
                        + Добавить технологию
                    </button>
                </div>)}
            
            {/* Форма добавления/редактирования */}
            {showForm && (
                <div className="form-modal" aria-modal="true">
                    <div className="modal-window">
                        <AddEditTechnology
                            onSave={onSaveTechnology}
                            onCancel={onCancel}
                            initialData={editingTech || {}}
                        />
                    </div>
                </div>
            )}

            <SearchTechnologies />
        </div>
    );
}

export default TechnologyList;
