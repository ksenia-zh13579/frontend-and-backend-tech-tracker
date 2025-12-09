import { Link } from 'react-router-dom';
import { useState } from 'react';
import TechnologyCard from '../components/TechnologyCard.jsx';
import TechFilter from '../components/TechFilter.jsx';
import SearchBox from '../components/SearchBox.jsx';
import SearchTechnologies from '../components/SearchTechnologies.jsx';
import './TechnologyList.css'

function TechnologyList({technologies, onStatusChange, onNotesChange, searchQuery, setSearchQuery, filteredTechs})
{
    const [filter, setFilter] = useState('all');

    return (
        <div className="page">
            <div className="page-header">
                <h1>Все технологии</h1>
                <Link to="/add-technology" className="btn btn-primary">
                    + Добавить технологию
                </Link>
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
                    <Link to="/add-technology" className="btn btn-primary">
                        Добавить первую технологию
                    </Link>
                </div>
            )
            }
            <SearchTechnologies />
        </div>
    );
}

export default TechnologyList;
