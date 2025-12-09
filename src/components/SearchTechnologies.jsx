import { useState, useEffect, useRef } from 'react';

function SearchTechnologies() {
    const BIN_ID = '6938263243b1c97be9e2023f';
    const MASTER_KEY = '$2a$10$FAr4j8Ltb.FeZkv8je8/uuAujPUdGHEwt4QypejDa2nsOaAkiDpGS';

    const [technologies, setTechnologies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Используем useRef для хранения таймера и AbortController
    const searchTimeoutRef = useRef(null);
    const abortControllerRef = useRef(null);

    // Функция для поиска продуктов
    const searchTechnologies = async (query) => {
        // Отменяем предыдущий запрос, если он существует
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Создаем новый AbortController для текущего запроса
        abortControllerRef.current = new AbortController();

        try {
            setLoading(true);
            setError(null);

            // Если поисковый запрос пустой, очищаем результаты
            if (!query.trim()) {
                setTechnologies([]);
                setLoading(false);
                return;
            }

            query = query.trim().toLowerCase();

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("X-Master-Key", MASTER_KEY);
            myHeaders.append("X-Bin-Meta", "false");

            const response = await fetch(
                `https://api.jsonbin.io/v3/b/${BIN_ID}?query=${encodeURIComponent(query)}`,
                {
                    method: 'GET',
                    headers: myHeaders
                }
            );

            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            const data = await response.json();
            console.log('search results: ', data);
            setTechnologies(data || []);

        } catch (err) {
            // Игнорируем ошибки отмены запроса
            if (err.name !== 'AbortError') {
                setError(err.message);
                console.error('Ошибка при поиске технологий:', err);
            }
        } finally {
            setLoading(false);
        }
    };

    // Обработчик изменения поискового запроса
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Очищаем предыдущий таймер
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        // Устанавливаем новый таймер для debounce (500ms)
        searchTimeoutRef.current = setTimeout(() => {
            searchTechnologies(value);
        }, 500);
    };

    // Очистка при размонтировании компонента
    useEffect(() => {
        return () => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        };
    }, []);

    return (
        <div className="techs-search">
            <h2>Поиск технологий в API</h2>
            
            <div className="search-box">
                <input
                type="text"
                placeholder="Введите название технологии..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
                />
                {loading && <span className="search-loading">⌛</span>}
            </div>

            {error && (
                <div className="error-message">
                Ошибка: {error}
                </div>
            )}

            <div className="search-results">
                {technologies.length > 0 ? (
                <>
                    <h3>Найдено технологий: {technologies.length}</h3>
                    <div className="technologies-grid">
                    {technologies.map(tech => (
                        <div key={tech.id} className="tech-card">
                        <div className="tech-info">
                            <h4>{tech.title}</h4>
                            <p className="tech-status">Статус : {tech.status}</p>
                            <p className="tech-category">Категория : {tech.category}</p>
                            <p className="tech-description">Описание: {tech.description}</p>
                            <p className="tech-difficulty">Уровень: {tech.difficulty}</p>
                            <p className="tech-notes">Записи: {tech.notes}</p>
                            <div>Ресурсы:
                                <ul className="tech-resources">
                                    {tech.resources.map(resource =>
                                    <li key={resource.length}>
                                        <a href={resource} className='tech-resource'>{resource}</a>
                                    </li> 
                                    )}
                                </ul>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                </>
                ) : (
                searchTerm.trim() && !loading && (
                    <p className="no-results">Технологии не найдены</p>
                )
                )}
            </div>
        </div>
    );
}

export default SearchTechnologies;