import { useState, useEffect } from 'react';
import './AddEditTechnology.css'

function AddEditTechnology({ onSave, onCancel, initialData = {} }) {
    // Состояние формы
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || 'frontend',
        difficulty: initialData.difficulty || 'beginner',
        deadline: initialData.deadline || '',
        resources: initialData.resources || ['']
    });

    // Состояние ошибок
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    // состояние отправки
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Валидация формы
    const validateForm = () => {
        const newErrors = {};

        // Валидация названия
        if (!formData.title.trim()) {
            newErrors.title = 'Название технологии обязательно';
        } else if (formData.title.trim().length < 2) {
            newErrors.title = 'Название должно содержать минимум 2 символа';
        } else if (formData.title.trim().length > 50) {
            newErrors.title = 'Название не должно превышать 50 символов';
        }

        // Валидация описания
        if (!formData.description.trim()) {
            newErrors.description = 'Описание технологии обязательно';
        } else if (formData.description.trim().length < 10) {
            newErrors.description = 'Описание должно содержать минимум 10 символов';
        }

        // Валидация дедлайна
        if (formData.deadline) {
            const deadlineDate = new Date(formData.deadline);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (!deadlineDate) {
                newErrors.deadline = 'Дедлайн обязателен для заполнения';
            }
            else if (deadlineDate < today) {
                newErrors.deadline = 'Дедлайн не может быть в прошлом';
            }
        }

        // Валидация ресурсов
        formData.resources.forEach((resource, index) => {
            if (resource && !isValidUrl(resource)) {
                newErrors[`resource_${index}`] = 'Введите корректный URL';
            }
        });

        setErrors(newErrors);
        setIsFormValid(Object.keys(newErrors).length === 0);
    };

    // Проверка URL
    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    // Валидация при каждом изменении формы
    useEffect(() => {
        validateForm();
    }, [formData]);

    // Обработчик изменения полей
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Обработчик изменения ресурсов
    const handleResourceChange = (index, value) => {
        const newResources = [...formData.resources];
        newResources[index] = value;
        setFormData(prev => ({
            ...prev,
            resources: newResources
        }));
    };

    // Добавление нового поля ресурса
    const addResourceField = () => {
        setFormData(prev => ({
            ...prev,
            resources: [...prev.resources, '']
        }));
    };

    // Удаление поля ресурса
    const removeResourceField = (index) => {
        if (formData.resources.length > 1) {
            const newResources = formData.resources.filter((_, i) => i !== index);
            setFormData(prev => ({
                ...prev,
                resources: newResources
            }));
        }
    };

    // Обработчик отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (isFormValid) {
            setIsSubmitting(true);
            // имитация отправки на сервер
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsSubmitting(false);

            setSubmitSuccess(true);
            // Очищаем пустые ресурсы перед сохранением
            const cleanedData = {
                ...formData,
                resources: formData.resources.filter(resource => resource.trim() !== '')
            };
            
            onSave(cleanedData);

            // скрытие сообщения об успехе через 3 секунды
            await new Promise(resolve => setTimeout(resolve, 3000));
            setSubmitSuccess(false);

            onCancel();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="technology-form" noValidate>
            <div className="form-header">
                <h2>
                    {initialData.title ? 'Редактирование технологии' : 'Добавление новой технологии'}
                </h2>
                <button className="close-button" onClick={onCancel}>
                    ×
                </button>
            </div>

            <div className="form-content">
                {/* Поле названия */}
                <div className="form-group">
                    <label htmlFor="title" className="required">
                        Название технологии
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        className={errors.title ? 'error' : ''}
                        placeholder="Например: React, Node.js, TypeScript"
                        aria-required="true"
                        aria-invalid={!!errors.title}
                        aria-describedby={errors.title ? 'title-error' : undefined}
                        required
                    />
                    {errors.title && (
                        <span id="title-error" className="error-message" role="alert">
                            {errors.title}
                        </span>
                    )}
                </div>

                {/* Поле описания */}
                <div className="form-group">
                    <label htmlFor="description" className="required">
                        Описание
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className={errors.description ? 'error' : ''}
                        placeholder="Опишите, что это за технология и зачем её изучать..."
                        aria-describedby={errors.description ? 'description-error' : undefined}
                        required
                    />
                    {errors.description && (
                        <span id="description-error" className="error-message" role="alert">
                            {errors.description}
                        </span>
                    )}
                </div>

                {/* Выбор категории */}
                <div className="form-group">
                    <label htmlFor="category">Категория</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="mobile">Mobile</option>
                        <option value="devops">DevOps</option>
                        <option value="database">Базы данных</option>
                        <option value="tools">Инструменты</option>
                    </select>
                </div>

                {/* Выбор сложности */}
                <div className="form-group">
                    <label htmlFor="difficulty">Уровень сложности</label>
                    <select
                        id="difficulty"
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                    >
                        <option value="beginner">Начинающий</option>
                        <option value="intermediate">Средний</option>
                        <option value="advanced">Продвинутый</option>
                    </select>
                </div>

                {/* Поле дедлайна */}
                <div className="form-group">
                    <label htmlFor="deadline">
                        Планируемая дата освоения
                    </label>
                    <input
                        id="deadline"
                        name="deadline"
                        type="date"
                        value={formData.deadline}
                        onChange={handleChange}
                        className={errors.deadline ? 'error' : ''}
                        aria-describedby={errors.deadline ? 'deadline-error' : undefined}
                        aria-required="true"
                        aria-invalid={!!errors.deadline}
                        required
                    />
                    {errors.deadline && (
                        <span id="deadline-error" className="error-message" role="alert">
                            {errors.deadline}
                        </span>
                    )}
                </div>

                {/* Поля ресурсов */}
                <div className="form-group">
                    <label>Ресурсы для изучения</label>
                    {formData.resources.map((resource, index) => (
                        <div key={index} className="resource-field">
                            <input
                                type="url"
                                value={resource}
                                onChange={(e) => handleResourceChange(index, e.target.value)}
                                placeholder="https://example.com"
                                className={errors[`resource_${index}`] ? 'error' : ''}
                                aria-describedby={errors[`resource_${index}`] ? `resource-${index}-error` : undefined}
                                aria-invalid={!!errors[`resource_${index}`]}
                            />
                            {formData.resources.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeResourceField(index)}
                                    className="remove-resource"
                                    aria-label="Удалить ресурс"
                                >
                                    ×
                                </button>
                            )}
                            {errors[`resource_${index}`] && (
                                <span 
                                    id={`resource-${index}-error`} 
                                    className="error-message" 
                                    role="alert"
                                >
                                    {errors[`resource_${index}`]}
                                </span>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addResourceField}
                        className="add-resource"
                    >
                        + Добавить ещё ресурс
                    </button>
                </div>
            </div>

            {/* Кнопки формы */}
            <div className="form-actions">
                <button
                    type="submit"
                    disabled={!isFormValid}
                    className="btn btn-primary"
                >
                    {initialData.title ? 'Обновить технологию' : 'Добавить технологию'}
                </button>
                
                <button
                    type="button"
                    onClick={onCancel}
                    className="btn btn-danger"
                >
                    Отмена
                </button>
            </div>

            {/* Информация о валидности формы */}
            {!isFormValid && (
                <div className="form-validation-info" role="status">
                    ⚠️ Заполните все обязательные поля корректно
                </div>
            )}

            {/* область для скринридера - объявляет статус отправки */}
            <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="sr-only"
            >
                {isSubmitting && 'Отправка формы...'}
                {submitSuccess && 'Форма успешно отправлена!'}
            </div>
            
            {/* визуальное сообщение об успехе */}
            {submitSuccess && (
                <div className="success-message" role="alert">
                    {initialData.title ? 'Технология успешно отредактирована!' : 'Технология успешно добавлена!'}
                </div>
            )}
        </form>
    );
}

export default AddEditTechnology;