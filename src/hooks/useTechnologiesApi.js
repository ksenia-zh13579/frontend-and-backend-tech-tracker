import { useState, useEffect, useCallback } from 'react';

function useApi(url, options = {}) {
    const [technologies, setTechnologies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Функция для выполнения запроса
    const fetchData = useCallback(async (abortController = null) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(url, {
                ...options,
                signal: abortController?.signal
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setTechnologies(result);
            console.log(result);

        } catch (err) {
            // Игнорируем ошибки отмены запроса
            if (err.name !== 'AbortError') {
                setError(err.message);
                console.log(`Не удалось загрузить технологии: ${err.message}`);
            }
        } finally {
            setLoading(false);
        }
    }, [url, options]);

    // Функция для повторного выполнения запроса
    const refetch = useCallback(() => {
        const abortController = new AbortController();
        fetchData(abortController);
        return () => abortController.abort();
    }, [fetchData]);

    // Добавление новой технологии
    const addTechnology = useCallback(async (techData) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            const newTech = {
                ...techData,
                id: Date.now(),
            };
            console.log(newTech);
            
            /* const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("X-Master-Key", "$2a$10$FAr4j8Ltb.FeZkv8je8/uuAujPUdGHEwt4QypejDa2nsOaAkiDpGS");

            const response = await fetch(url, {
                method: "PUT",
                headers : myHeaders,
                body: JSON.stringify([...data, newTech])
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } */

            setTechnologies(prev => [...prev, newTech]);
            return newTech;
            
        } catch (err) {
            setError(`Не удалось добавить технологию: ${err.message}`);
            console.log(`Не удалось добавить технологию: ${err.message}`);
        }
    }, [url]);

    // Выполняем запрос при изменении URL
    useEffect(() => {
        const abortController = new AbortController();

        // Выполняем запрос только если URL существует
        if (url) {
            fetchData(abortController);
        }

        // Функция очистки - отменяем запрос при размонтировании
        return () => {
            abortController.abort();
        };
    }, [url]);

    // Функция для обновления статуса технологии
    const updateStatus = useCallback((techId, newStatus) => {
        setTechnologies(prev =>
            prev.map(tech =>
                tech.id === techId ? { ...tech, status: newStatus } : tech
            )
        );
    }, []);

    // Функция для обновления заметок
    const updateNotes = useCallback((techId, newNotes) => {
        setTechnologies(prev =>
            prev.map(tech =>
                tech.id === techId ? { ...tech, notes: newNotes } : tech
            )
        );
    }, []);

    const addResource = useCallback((techId, newResource) => {
        setTechnologies(prev =>
            prev.map(tech =>
                tech.id === techId ? { ...tech, resources: [...tech.resources, newResource] } : tech
            )
        );
    }, []);

    // Функция для расчета общего прогресса
    const calculateProgress = () => {
        if (technologies.length === 0) return 0;
        const completed = technologies.filter(tech => tech.status ===
        'completed').length;
        return Math.round((completed / technologies.length) * 100);
    };

    return { 
        technologies, 
        updateStatus, 
        updateNotes, 
        progress: calculateProgress(), 
        loading, 
        error, 
        refetch, 
        addTechnology,
        addResource
    };
}

export default useApi;