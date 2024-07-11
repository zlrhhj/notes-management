import React from 'react';
const NoteList = ({notes, onEditNote, onDeleteNote, tag}) => {
  return(
    <div>
      {
        tag?
        <h3>Notes by Tag: {tag}</h3>
        :
        <h3>All Notes </h3>
      }
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <h4>{note.title}</h4>
            <p>{note.content}</p>
            <div>
              {note.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <button onClick={() => onEditNote(note)}>Edit</button>
            <button onClick={() => onDeleteNote(note._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
};
export default NoteList;