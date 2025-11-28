import './TechnologyCard.css';
import TechnologyNotes from './TechnologyNotes';

function TechnologyCard({id, title, description, statusID, setStatus, notes, onNotesChange})
{
    const statuses = [
        {
            status : 'not-started', 
            icon : '💤'}, 
        {
            status : 'in-progress', 
            icon : '⏳'
        }, 
        {
            status : 'completed', 
            icon : '✅'
        }
    ];

    return (
        <div 
            onClick={() => {setStatus(id, (statusID + 1) % 3)}} 
            className={"technology-card " + statuses[statusID].status}
        >
            <h3 style={{flex: 1}}>
                {title}
                <span>{statuses[statusID].icon}</span>
            </h3>
            <p style={{flex: 1}}>{description}</p>
            <TechnologyNotes notes={notes} onNotesChange={onNotesChange} techId={id} />
        </div>
    );
}

export default TechnologyCard