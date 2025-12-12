import './TechnologyNotes.css'

function TechnologyNotes({ notes, onNotesChange, techId }) {
    return (
        <div className="notes-section">
            <h3>Мои заметки:</h3>
            <textarea
                name='notes'
                value={notes}
                onChange={(e) => onNotesChange(techId, e.target.value)}
                placeholder="Записывайте сюда важные моменты..."
                rows="5"
            />
            <div className="notes-hint">
                {notes.length > 0 ? `Заметка сохранена (${notes.length} символов)` :
                'Добавьте заметку'}
            </div>
        </div>
    );
}

export default TechnologyNotes
