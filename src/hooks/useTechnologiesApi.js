import useApi from "./useApi";

function useTechnologiesApi() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-Master-Key", "$2a$10$FAr4j8Ltb.FeZkv8je8/uuAujPUdGHEwt4QypejDa2nsOaAkiDpGS");
    myHeaders.append("X-JSON-Path", "$.technologies");

    const { data: technologies, loading, error, refetch } = useApi(
        'https://api.jsonbin.io/v3/b/693586e343b1c97be9dda5f9', {
            method: "GET",
            headers: myHeaders
        }
    );

    // Функция для расчета общего прогресса
    const calculateProgress = () => {
        if (technologies.length === 0) return 0;
        const completed = technologies.filter(tech => tech.status ===
        'completed').length;
        return Math.round((completed / technologies.length) * 100);
    };

    return {
        technologies,
        loading, 
        error, 
        refetch,
        progress: calculateProgress()
    };
}

export default useTechnologiesApi;