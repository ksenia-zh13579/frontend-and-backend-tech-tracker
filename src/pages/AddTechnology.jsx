import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './AddTechnology.css'

function AddTechnology() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!e.target.checkValidity())
        {
            e.stopPropagation();
            return;
        }

        const saved = localStorage.getItem('technologies');
        const technologies = saved ? JSON.parse(saved) : [];

        const newID = technologies[-1].id + 1;

        const newTechnology = {
            id: newID,
            title: formData.title.trim(),
            description: formData.description.trim(),
            category: formData.category,
            status: 'not-started',
            notes: ''
        };

        technologies.push(newTechnology);
        localStorage.setItem('technologies', JSON.stringify(technologies));

        e.target.reset();
        navigate('/technologies');
        alert('Новая технология успешно добавлена!');
    }

    return (
        <div className="page">
            <div className="page-header">
                <button
                    onClick={() => navigate('/technologies')}
                    className="btn btn-secondary"
                    aria-label="Вернуться к списку технологий"
                >
                    ← Назад к списку
                </button>
                <h1>Добавьте новую технологию</h1>
            </div>
            <div className='add-technology'>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='form-group'>
                        <label htmlFor='title'>Название технологии:</label>
                        <span className='required'>*</span>
                        <input 
                            type='text' 
                            name='title' 
                            id='title' 
                            required 
                            placeholder='Введите название технологии...'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='description'>Описание технологии:</label>
                        <textarea 
                            rows={3} 
                            placeholder='Введите описание технологии...'
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='category'>Категория:</label>
                        <span className='required'>*</span>
                        <select 
                            name="category" 
                            id="category" 
                            required 
                            onChange={handleChange}
                        >
                            <option value='' selected>--Выберете категорию--</option>
                            <option value='frontend'>frontend</option>
                            <option value='backend'>backend</option>
                        </select>
                    </div>
                    <div>
                        <button type='submit'>Добавить</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddTechnology;