import useApi from "./useApi";

function useTechnologiesApi() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-Master-Key", "$2a$10$FAr4j8Ltb.FeZkv8je8/uuAujPUdGHEwt4QypejDa2nsOaAkiDpGS");
    myHeaders.append("X-Bin-Meta", "false");

    const { data: technologies, updateStatus, updateNotes, progress, loading, error, refetch, addData } = useApi(
        'https://api.jsonbin.io/v3/b/693586e343b1c97be9dda5f9', 
        { headers: myHeaders }
    );

    return {
        technologies, 
        updateStatus, 
        updateNotes,
        loading, 
        error, 
        refetch,
        progress,
        addData
    };
}

export default useTechnologiesApi;