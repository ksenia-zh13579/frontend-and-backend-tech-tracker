import RoadmapImporter from '../components/RoadmapImporter';
import './Home.css'

function Home({error, addTechnology}) {
    return (
        <div className="page">
            <div className="page-header">
                <h1>Добро пожаловать на главную страницу!</h1>
                <p>Это стартовая страница нашего приложения.</p>
            </div>
            <div className="features">
                <h2>Наши возможности:</h2>
                <ul>
                    <li>Навигация между страницами</li>
                    <li>Динамическая загрузка контента</li>
                    <li>Быстрая работа без перезагрузки</li>
                </ul>
            </div>
            <RoadmapImporter
                error={error}
                addTechnology={addTechnology}
            />
        </div>
    );
}

export default Home;