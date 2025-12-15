import { useState, useEffect } from 'react';
import './EditStatuses.css';

function EditStatuses({technologies, onStatusChange, onCancel}) {
    const [formData, setFormData] = useState({
        techs : [],
        status : ''
    });

    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleSelectedTechsChange = (e) => {
        let newTechs = [...e.target.selectedOptions].map(opt => Number(opt.value));
        console.log(newTechs);        
        setFormData(prev => ({...prev, techs : newTechs}));
    };

    const handleSelectedStatusChange = (e) => {
        const value = e.target.value;
        setFormData(prev => ({
            ...prev,
            status: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (formData.techs.length === 0)
            newErrors.techs = 'Выберете хотя бы одну технологию!';
        if (formData.status === '')
            newErrors.status = 'Выберете статус, который нужно применить к выбранным технологиям!';

        setErrors(newErrors);
        setIsFormValid(Object.keys(newErrors).length === 0);
    };

    useEffect(() => {
        validateForm();
    }, [formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isFormValid) {
            setIsSubmitting(true);
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsSubmitting(false);

            setSubmitSuccess(true);
            
            for (const techId of formData.techs)
                onStatusChange(techId, formData.status);

            await new Promise(resolve => setTimeout(resolve, 3000));
            setSubmitSuccess(false);

            onCancel();
        }
    };

    return (
        <form className='edit-statuses-form' onSubmit={handleSubmit} noValidate>
            <div className='form-header'>
                <h2>Редактирование статусов</h2>
                <button className="close-button" onClick={onCancel}>
                    ×
                </button>
            </div>
            <div className='form-content'>
                <div className='form-group'>
                    <label htmlFor='techs-select'>
                        Выберете технологии для изменения
                    </label>
                    <select 
                        id='techs-select' 
                        name='techs'
                        multiple
                        required
                        onChange={handleSelectedTechsChange}
                        className={errors.techs ? 'error' : ''}
                        aria-required="true"
                        aria-invalid={!!errors.techs}
                        aria-describedby={errors.techs ? 'techs-error' : undefined}
                    >
                        <option value='' disabled>--выберете хотя бы 1 опцию</option>
                        {technologies.map(tech => 
                            <option key={tech.id} value={tech.id}>{tech.title}</option>
                        )}
                    </select>
                    {errors.techs && (
                        <span id="techs-error" className="error-message" role="alert">
                            {errors.techs}
                        </span>
                    )}
                </div>
                <div className='form-group'>
                    <label htmlFor='status-select'>
                        Выберете технологии для изменения
                    </label>
                    <select 
                        id='status-select' 
                        name='status'
                        required
                        onChange={handleSelectedStatusChange}
                        className={errors.status ? 'error' : ''}
                        aria-required="true"
                        aria-invalid={!!errors.status}
                        aria-describedby={errors.status ? 'status-error' : undefined}
                    >
                        <option value='' disabled>--Выберете статус--</option>
                        <option value='not-started'>Не начато</option>
                        <option value='in-progress'>В процессе</option>
                        <option value='completed'>Завершено</option>
                    </select>
                    {errors.status && (
                        <span id="status-error" className="error-message" role="alert">
                            {errors.status}
                        </span>
                    )}
                </div>
            </div>
            <div className='form-actions'>
                <button
                    type="submit"
                    disabled={!isFormValid}
                    className="btn btn-primary"
                >
                    Применить
                </button>
                
                <button
                    type="button"
                    onClick={onCancel}
                    className="btn btn-danger"
                >
                    Отмена
                </button>
            </div>

            {!isFormValid && (
                <div className="form-validation-info" role="status">
                    ⚠️ Заполните все обязательные поля корректно
                </div>
            )}

            <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="sr-only"
            >
                {isSubmitting && 'Отправка формы...'}
                {submitSuccess && 'Форма успешно отправлена!'}
            </div>

            {submitSuccess && (
                <div className="success-message" role="alert">
                    Изменения успешно применены!
                </div>
            )}
        </form>
    );
}

export default EditStatuses;