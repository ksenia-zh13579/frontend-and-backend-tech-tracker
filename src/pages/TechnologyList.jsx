import { Link } from 'react-router-dom';
import TechnologyCard from '../components/TechnologyCard.jsx';
import './TechnologyList.css'

function TechnologyList({technologies, onStatusChange, onNotesChange}) {
    return (
        <div className="page">
            <div className="page-header">
                <h1>Все технологии</h1>
                <Link to="/add-technology" className="btn btn-primary">
                    + Добавить технологию
                </Link>
            </div>
            {technologies.length > 0 ? (
                <div className="technologies-grid">
                    {technologies.map(tech => (
                        <TechnologyCard 
                            key={tech.id}
                            tech={tech} 
                            onStatusChange={onStatusChange} 
                            onNotesChange={onNotesChange}
                        />
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <p>Технологий пока нет.</p>
                    <Link to="/add-technology" className="btn btn-primary">
                        Добавить первую технологию
                    </Link>
                </div>
            )
            }
        </div>
    );
}

export default TechnologyList;
