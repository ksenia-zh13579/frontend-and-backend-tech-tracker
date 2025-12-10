import './TechnologyResources.css'

function TechnologyResources({technology, onAddResource})
{
    const openAddResourceSection = () => {
        let addResourceSection = document.getElementById('addResourceSection');
        let errorMessage = document.querySelector('.error-message');
        let input = document.querySelector('#resourceInput');

        if (addResourceSection.classList.contains('invisible'))
        {
            errorMessage.style.display = 'none';
            input.classList.remove('error');
        }

        addResourceSection.classList.toggle('invisible');
    }

    const submitResource = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const newResource = formData.get('resourceInput');
        let errorMessage = document.querySelector('.error-message');
        let input = document.querySelector('#resourceInput');
        
        if (!URL.parse(newResource))
        {
            errorMessage.style.display = 'block';
            errorMessage.innerText = 'Неверный URL адрес!';
            input.classList.add('error');
            return;
        }

        onAddResource(technology.id, newResource);
        alert('Ресурс успешно добавлен!');
        e.target.reset();
        errorMessage.style.display = 'none';

        let addResourceSection = document.getElementById('addResourceSection');
        addResourceSection.classList.add('invisible');
    }

    const handleChange = (e) => {
        let errorMessage = document.querySelector('.error-message');

        if (!e.target.value.trim())
        {
            errorMessage.style.display = 'none';
            let input = document.querySelector('#resourceInput');
            input.classList.remove('error');
        }   
    }

    return (
        <div className="add-resources">
            <h3>Ресурсы</h3>
            <ul className="tech-resources">
                {technology.resources.map(resource =>
                <li key={resource.length}>
                    <a href={resource} className='tech-resource'>{resource}</a>
                </li> 
                )}
            </ul>
            <button 
                type='button' 
                id='btnAddResource'
                onClick={openAddResourceSection}
                className='btn btn-info'
            >
                Добавить ресурс
            </button>

            <div className='add-resource-section invisible' id="addResourceSection">
                <form onSubmit={submitResource} noValidate>
                    <label htmlFor='resourceInput'>Новый ресурс:</label>
                    <input 
                        id='resourceInput'
                        name="resourceInput" 
                        type='url' 
                        placeholder='новый ресурс...'
                        onChange={handleChange}
                    />
                    <p className="error-message"></p>
                    <button type="submit" className='btn btn-success'>Сохранить ресурс</button>
                </form>
            </div>
        </div>
    );
}

export default TechnologyResources;