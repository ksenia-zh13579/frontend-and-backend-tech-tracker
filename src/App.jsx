import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
//import useTechnologies from './hooks/useTechnologies';
import useTechnologiesApi from './hooks/useTechnologiesApi';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import './App.css';

function App()
{
  // Состояние для отслеживания авторизации
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // Проверяем авторизацию при загрузке и при изменении
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const user = localStorage.getItem('username') || '';
    setIsLoggedIn(loggedIn);
    setUsername(user);
  }, []);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
  };

  //const { technologies, updateStatus, updateNotes, progress } = useTechnologies();
  const BIN_ID = '6938263243b1c97be9e2023f';
  const MASTER_KEY = '$2a$10$FAr4j8Ltb.FeZkv8je8/uuAujPUdGHEwt4QypejDa2nsOaAkiDpGS';

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-Master-Key", MASTER_KEY);
  myHeaders.append("X-Bin-Meta", "false");

  const { 
    technologies, 
    updateStatus, 
    updateNotes, 
    progress, 
    loading, 
    error, 
    refetch, 
    addTechnology, 
    editTechnology
  } = useTechnologiesApi(
      `https://api.jsonbin.io/v3/b/${BIN_ID}`, 
      { headers: myHeaders }
  );
  
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTechs = {
    'all' : technologies,
    'not-started' : technologies.filter((tech) => tech.status === 'not-started'),
    'in-progress' : technologies.filter((tech) => tech.status === 'in-progress'),
    'completed' : technologies.filter((tech) => tech.status === 'completed'),
    'query' : technologies.filter(tech =>
      tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  };

  const [showForm, setShowForm] = useState(false);
  const [editingTech, setEditingTech] = useState(null);

    // Обработчик сохранения технологии
  const handleSaveTechnology = (techData) => {
    if (editingTech) {
        // Редактирование существующей технологии
        editTechnology(editingTech, techData);
    } else {
        // Добавление новой технологии
        addTechnology(techData);
    }
  };

  // Обработчик редактирования
  const handleEdit = (technology) => {
      setEditingTech(technology);
      setShowForm(true);
  };

  // Обработчик отмены
  const handleCancel = () => {
      setShowForm(false);
      setEditingTech(null);
  };

  useEffect(() => {
    if (showForm) {
      document.querySelector('.modal-window').focus({ focusVisible: true, preventScroll: false });
    }
    else {
      let btnAddEditTechnology = document.querySelector('btnAddEditTechnology');
      if (btnAddEditTechnology)
        btnAddEditTechnology.focus({ focusVisible: true, preventScroll: false });
    }
  }, [showForm]);

  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
        <p>Загрузка технологий...</p>
      </div>
    );
  }
  
  return (
    <Router>
      <div className='app'>
        <Navigation isLoggedIn={isLoggedIn} username={username} handleLogout={handleLogout} />
        <header className="app-header">
          <h1>🚀 Трекер изучения технологий</h1>
          {isLoggedIn ? 
            (
              <button onClick={refetch} className="retry-button">
                Обновить
              </button>
            ) : (
              <></>
            )
          }
        </header>

        {error && (
          <div className="app-error">
            <p>{error}</p>
            <button className='retry-button' onClick={refetch}>Попробовать снова</button>
          </div>
        )}
        
        <main className='main-content'>
          
          <Routes>
            <Route path='/' element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Home error={error} addTechnology={addTechnology} />
              </ProtectedRoute>
            } />
            <Route 
              path="/login" 
              element={<Login onLogin={handleLogin} />} 
            />
            <Route path='/technologies' element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <TechnologyList 
                  technologies={technologies} 
                  onStatusChange={updateStatus} 
                  onNotesChange={updateNotes}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  filteredTechs={filteredTechs}
                  showForm={showForm}
                  editingTech={editingTech}
                  onSaveTechnology={handleSaveTechnology}
                  onCancel={handleCancel}
                  handleShowForm={() => setShowForm(true)}
                />
              </ProtectedRoute>} />
            <Route path='/technology/:techId' element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <TechnologyDetail 
                  technologies={technologies} 
                  onStatusChange={updateStatus} 
                  onNotesChange={updateNotes}
                  showForm={showForm}
                  editingTech={editingTech}
                  onSaveTechnology={handleSaveTechnology}
                  onEdit={handleEdit}
                  onCancel={handleCancel}
                />
              </ProtectedRoute>
            } />
            <Route path='/statistics' element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Statistics
                  technologies={technologies}
                  filteredTechs={filteredTechs}
                  progress={progress}
                />
              </ProtectedRoute>
            } />
            <Route path='/settings' element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Settings 
                  technologies={technologies}
                  onStatusChange={updateStatus}
                  addTechnology={addTechnology}
                />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;