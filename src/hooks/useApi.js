import { useState, useEffect, useCallback } from 'react';

function useApi(url, options = {}) {
    const [data, setData] = useState([]);
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
            setData(result);
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
    const addData = useCallback(async (techData) => {
        try {
            const newTech = {
                ...techData,
                id: setTimeout(() => Date.now(), 100),
            };
            console.log(newTech);
            
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("X-Master-Key", "$2a$10$FAr4j8Ltb.FeZkv8je8/uuAujPUdGHEwt4QypejDa2nsOaAkiDpGS");

            const response = await fetch(url, {
                method: "PUT",
                headers : myHeaders,
                body: JSON.stringify([...data, newTech])
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setData(prev => [...prev, newTech]);
            return newTech;
            
        } catch (err) {
            setError(`Не удалось добавить технологию: ${err.message}`);
            console.log(`Не удалось добавить технологию: ${err.message}`);
        }
    }, [url, data]);

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
        setData(prev =>
            prev.map(tech =>
                tech.id === techId ? { ...tech, status: newStatus } : tech
            )
        );
    }, []);

    // Функция для обновления заметок
    const updateNotes = useCallback((techId, newNotes) => {
        setData(prev =>
            prev.map(tech =>
                tech.id === techId ? { ...tech, notes: newNotes } : tech
            )
        );
    }, []);

    // Функция для расчета общего прогресса
    const calculateProgress = () => {
        if (data.length === 0) return 0;
        const completed = data.filter(tech => tech.status ===
        'completed').length;
        return Math.round((completed / data.length) * 100);
    };

    return { 
        data, 
        updateStatus, 
        updateNotes, 
        progress: calculateProgress(), 
        loading, 
        error, 
        refetch, 
        addData };
}

export default useApi;