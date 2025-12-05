import { Link } from 'react-router-dom';
import TechnologyNotes from './TechnologyNotes';
import './TechnologyCard.css';

function TechnologyCard({tech, onStatusChange, onNotesChange})
{
    const StatusIcons = {
        'not-started' : '💤',
        'in-progress' : '⏳',
        'completed' : '✅'
    }

    const newStatus = (tech.status === 'not-started' ? 'in-progress' : (tech.status == 'in-progress' ? 'completed' : 'not-started'));

    return (
        <div 
            onClick={(e) => {
                if (e.target.tagName !== 'A')
                    onStatusChange(tech.id, newStatus);
            }} 
            className={"technology-card " + tech.status}
        >
            <h3 style={{flex: 1}}>
                {tech.title}
                <span>{StatusIcons[tech.status]}</span>
            </h3>
            <p style={{flex: 1}}>{tech.description}</p>
            <TechnologyNotes 
                notes={tech.notes} 
                onNotesChange={onNotesChange} 
                techId={tech.id}
            />
            <div className='technology-card-footer'>
                <Link to={`/technology/${tech.id}`} className="btn btn-primary">
                    Подробнее →
                </Link>
                <span className='badge badge-info'>{tech.category}</span>
            </div>
        </div>
    );
}

export default TechnologyCard