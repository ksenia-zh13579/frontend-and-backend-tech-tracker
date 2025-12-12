import { Link } from 'react-router-dom';
import { useState } from 'react';
import TechnologyCard from '../components/TechnologyCard.jsx';
import TechFilter from '../components/TechFilter.jsx';
import SearchBox from '../components/SearchBox.jsx';
import SearchTechnologies from '../components/SearchTechnologies.jsx';
import AddEditTechnology from '../components/AddEditTechnology.jsx';
import './TechnologyList.css'

function TechnologyList({ technologies, onStatusChange, onNotesChange, searchQuery, setSearchQuery, filteredTechs, showForm, setShowForm, editingTech, onSaveTechnology, onCancel }) 
{
    const [filter, setFilter] = useState('all');

    return (
        <div className="page">
            <div className="page-header">
                <h1>Все технологии</h1>
                <button 
                    onClick={() => setShowForm(true)}
                    className="btn btn-primary"
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
                        onClick={() => setShowForm(true)}
                        className="btn btn-primary"
                    >
                        + Добавить технологию
                    </button>
                </div>)}
            
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

            <SearchTechnologies />
        </div>
    );
}

export default TechnologyList;
