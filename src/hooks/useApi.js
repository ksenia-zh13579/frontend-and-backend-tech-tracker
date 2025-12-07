import { useState, useEffect, useCallback } from 'react';

// Кастомный хук для работы с API
function useApi(url, options = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Функция для выполнения запроса
    const fetchData = useCallback(async (abortController) => {
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

        } catch (err) {
            // Игнорируем ошибки отмены запроса
            if (err.name !== 'AbortError') {
                setError(err.message);
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
                id: Date.now(), // В реальном приложении ID генерируется на сервере
                ...techData,
                createdAt: new Date().toISOString()
            };
            
            const response = await fetch(url, {
                method: "POST",
                ...options,
                body: JSON.stringify(newTech)
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
    }, [url, options]);

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
    }, [url, fetchData]); // fetchData стабильна благодаря useCallback

    return { data, loading, error, refetch, addData };
}

export default useApi;