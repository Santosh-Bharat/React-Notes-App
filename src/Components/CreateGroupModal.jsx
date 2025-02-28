import { useState, useRef, useEffect } from "react";
import "./CreateGroupModal.css";

export const CreateGroupModal = ({ isOpen, onClose, onSubmit }) => {
  const colors = [
    "#0047FF",
    "#43E6FC",
    "#6691FF",
    "#B38BFA",
    "#F19576",
    "#FF66F0",
    "#FFC0C0",
    "#16008B",
  ];
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length >= 2) {
      onSubmit(name, selectedColor);
      setName("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div ref={modalRef} className="modal-content">
        <h2>Create New Group</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Group Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter group name"
              required
            />
          </div>
          <div className="form-group">
            <label>Choose Colour</label>
            <div className="color-picker">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`color-button ${selectedColor === color ? "selected" : ""}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <button type="submit" disabled={name.length < 2}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};