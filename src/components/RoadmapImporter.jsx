import { useState } from 'react';

function RoadmapImporter({error, addTechnology}) {
    const IMPORT_BIN_ID = '69360358ae596e708f8a2255';
    const MASTER_KEY = '$2a$10$FAr4j8Ltb.FeZkv8je8/uuAujPUdGHEwt4QypejDa2nsOaAkiDpGS';

    const [importing, setImporting] = useState(false);

    const handleImportRoadmap = async (roadmapUrl) => {
        try {
            setImporting(true);
            
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("X-Master-Key", MASTER_KEY);
            myHeaders.append("X-Bin-Meta", "false");
            const response = await fetch(roadmapUrl, { headers: myHeaders });

            if (!response.ok) 
                throw new Error('Не удалось загрузить дорожную карту');
            
            const roadmapData = await response.json();
            console.log(roadmapData);
            
            // Добавляем каждую технологию из дорожной карты
            for (const tech of roadmapData) {
                await addTechnology(tech);
            }
            
            alert(`Успешно импортировано ${roadmapData.length} технологий`);
            
        } catch (err) {
            alert(`Ошибка импорта: ${err.message}`);
        } finally {
            setImporting(false);
        }
    };

    const handleExampleImport = () => {
        // Пример импорта из фиктивного API
        handleImportRoadmap(`https://api.jsonbin.io/v3/b/${IMPORT_BIN_ID}`);
    };

    return (
        <div className='page'>
            <div className="roadmap-importer">
                <h3>Импорт дорожной карты</h3>
                
                <div className="import-actions">
                    <button 
                    onClick={handleExampleImport}
                    disabled={importing}
                    className="import-button"
                    >
                    {importing ? 'Импорт...' : 'Импорт пример дорожной карты'}
                    </button>
                </div>

                {error && (
                    <div className="error-message">
                    {error}
                    </div>
                )}
            </div>
        </div>
    );
}

export default RoadmapImporter;