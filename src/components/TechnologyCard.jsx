import './TechnologyCard.css';

function TechnologyCard({id, title, description, statusID, setStatus})
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
            <h3>
                {title}
                <span>{statuses[statusID].icon}</span>
            </h3>
            <p>{description}</p>
        </div>
    );
}

export default TechnologyCard