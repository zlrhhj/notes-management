import React, { useState , useEffect} from 'react';

const NoteEditor = ({ note, tags, onSaveNote, onCancelNote }) => {
  const [title, setTitle] = useState(note ? note.title : '');
  const [content, setContent] = useState(note ? note.content : '');
  const [selectedTags, setSelectedTags] = useState(note ? note.tags : []);

  const handleSaveNote = () => {
    const newNote = {
      ...note,
      title,
      content,
      tags: selectedTags,
    }
    console.log(newNote);
    onSaveNote(newNote);
  }

  const handleTagChange = (tag) => {
    if(selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  }
  const handleCancelNote = () => {
    setTitle('');
    setContent('');
    setSelectedTags([]);
    onCancelNote();
  };

  useEffect(() => {
    if(note) {
      setTitle(note.title);
      setContent(note.content);
      setSelectedTags(note.tags);
    }
  }, [note]);

  return(
    <div>
      <h3>{note ? 'Edit Note' : 'Add New Note'}</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note Title"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Note Content"
      />
      <div>
        {tags.map((tag) => (
          <label key={tag._id}>
            <input
              type="checkbox"
              checked={selectedTags && selectedTags.includes(tag.name)}
              onChange={() => handleTagChange(tag.name)}
            />
            {tag.name}
          </label>
        ))}
      </div>
      <button onClick={handleSaveNote}>{note ? 'Save' : 'Add'}</button>
      <button onClick={handleCancelNote}>Cancel</button>
    </div>
  )
};
export default NoteEditor;