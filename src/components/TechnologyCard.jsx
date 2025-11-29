import './TechnologyCard.css';
import TechnologyNotes from './TechnologyNotes';

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
            onClick={() => {onStatusChange(tech.id, newStatus)}} 
            className={"technology-card " + tech.status}
        >
            <h3 style={{flex: 1}}>
                {tech.title}
                <span>{StatusIcons[tech.status]}</span>
            </h3>
            <p style={{flex: 1}}>{tech.description}</p>
            <TechnologyNotes notes={tech.notes} onNotesChange={onNotesChange} techId={tech.id} />
        </div>
    );
}

export default TechnologyCard