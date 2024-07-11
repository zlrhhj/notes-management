import React, { useState } from 'react';

const TagManager = ({tags, onAddTag, onEditTag, onDeleteTag}) => {
  const [newTag, setNewTag] = useState('');
  const [editingTag, setEditingTag] = useState(null);
  const [editingTagValue, setEditingTagValue] = useState('');


  const handleAddTag = () => {
    if(newTag && !tags.includes(newTag)) {
      onAddTag(newTag);
      setNewTag('');
    }
  };

  const handleEditTag = (tag) => {
    console.log(tag);
    setEditingTag(tag);
    setEditingTagValue(tag.name);
  };

  const handleSaveEditTag = () => {
    if(editingTagValue && editingTagValue !== editingTag )
    {
      onEditTag(editingTag, editingTagValue);
      setEditingTag(null);
      setEditingTagValue('');
    }
  };
  const handleCancelEditTag = () => {
    setEditingTag(null);
    setEditingTagValue('');
  };


  return(
    <div className="tag-manager">
      <h3>Manage Tags</h3>
      <input
        type="text"
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
        placeHodler="Add a new tag"
      />
      <button onClick={handleAddTag}>Add</button>
      <ul>
        {tags.map((tag, index) => (
          <li key={index}>
            {editingTag === tag ? (
              <div>
                <input
                  type="text"
                  value={editingTagValue}
                  onChange={(e) => setEditingTagValue(e.target.value)}
                />
                <button onClick={handleSaveEditTag}>Save</button>
                <button onClick={handleCancelEditTag}>Cancel</button>
              </div>
            ) : (
              <span>{tag.name}</span>
            )}
            <button onClick={() => handleEditTag(tag)}>Edit</button>
            <button onClick={() => onDeleteTag(tag)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TagManager;