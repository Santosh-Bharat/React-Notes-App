import { useState } from "react";
import { Send } from "lucide-react";
import "./NotesArea.css";

export const NotesArea = ({ groupName, notes, onAddNote }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onAddNote(input);
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="notes-area">
      <div className="notes-header">
        <h2>{groupName}</h2>
      </div>
      <div className="notes-list">
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <p>{note.content}</p>
            <p className="note-timestamp">{note.timestamp}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="notes-form">
        <div className="form-container">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your text here........."
            rows={4}
          />
          <button type="submit" disabled={!input.trim()}>
            <Send size={24} />
          </button>
        </div>
      </form>
    </div>
  );
};