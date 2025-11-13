import './TechnologyCard.css';

function TechnologyCard({title, description, status})
{
    return (
        <div className={"technology-card " + status}>
            <h3>
                {title}
                <span>{status == 'completed' ? '✅' : (status == 'in-progress' ? '⏳' : '💤')}</span>
            </h3>
            <p>{description}</p>
        </div>
    );
}

export default TechnologyCard