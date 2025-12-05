import './SearchBox.css'

function SearchBox({searchQuery, setSearchQuery, setFilter, filteredTechs})
{
    return (
        <div className="search-box">
            <h3>Поиск технологий</h3>
            <span>🔎</span>
            <input
                name='search'
                type="text"
                placeholder="Поиск технологий..."
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    e.target.parentElement.querySelector('.query-num').style.display = 'none';
                }}
                onKeyUp={(e) => {
                if (!e.isComposing && e.keyCode !== 229 && e.code === 'Enter')
                {
                    setFilter('query');
                    e.target.parentElement.querySelector('.query-num').style.display = 'inline';
                }
                }}
            />
            <span className='query-num'>Найдено: {filteredTechs['query'].length}</span>
        </div>
    );
}

export default SearchBox;