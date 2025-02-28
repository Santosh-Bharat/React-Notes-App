import { useState } from "react";
import { Sidebar } from "./Components/Sidebar";
import { NotesArea } from "./Components/NotesArea";
import { CreateGroupModal } from "./Components/CreateGroupModal";
import "./App.css";
import image1 from "./assets/image1.png";

export function App() {
  const [groups, setGroups] = useState([]);
  const [notes, setNotes] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateGroup = (name, color) => {
    const newGroup = {
      id: Date.now().toString(),
      name,
      color,
    };
    setGroups([...groups, newGroup]);
    setSelectedGroup(newGroup);
  };

  const handleAddNote = (content) => {
    if (!selectedGroup) return;
    const newNote = {
      id: Date.now().toString(),
      content,
      timestamp: new Date().toLocaleString(),
      groupId: selectedGroup.id,
    };
    setNotes([...notes, newNote]);
  };

  return (
    <div className="app-container">
      <Sidebar
        groups={groups}
        selectedGroup={selectedGroup}
        onSelectGroup={setSelectedGroup}
        onAddGroup={() => setIsModalOpen(true)}
      />
      {selectedGroup ? (
        <NotesArea
          groupName={selectedGroup.name}
          notes={notes.filter((note) => note.groupId === selectedGroup.id)}
          onAddNote={handleAddNote}
        />
      ) : (

        <div className="welcome-screen">
          <div className="welcome-content">
          <img
              src={image1.png}
              alt="Welcome"
              className="welcome-image"
            />
            <h2>Pocket Notes</h2>
            <p>
              Send and receive messages without keeping your phone online.
              <br />
              Use Pocket Notes on up to 4 linked devices and 1 mobile phone
            </p>
          </div>
        </div>
      )}
      <CreateGroupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateGroup}
      />
    </div>
  );
}