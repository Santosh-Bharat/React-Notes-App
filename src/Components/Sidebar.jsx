import { Plus } from "lucide-react";
import "./Sidebar.css";

export const Sidebar = ({ groups, selectedGroup, onSelectGroup, onAddGroup }) => {
  return (
    <div className="sidebar">
      <p className="sidebar-header">Pocket Notes</p>
      <div className="groups-list">
        {groups.map((group) => (
          <button
            key={group.id}
            onClick={() => onSelectGroup(group)}
            className={`group-item ${selectedGroup?.id === group.id ? "selected" : ""}`}
          >
            <div
              className="group-icon"
              style={{ backgroundColor: group.color }}
            >
              {group.name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </div>
            <span className="group-name">{group.name}</span>
          </button>
        ))}
      </div>
      <button onClick={onAddGroup} className="add-group-button">
        <Plus size={24} />
      </button>
    </div>
  );
};