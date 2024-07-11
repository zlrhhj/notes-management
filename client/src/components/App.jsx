import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header.jsx';
import TagManager from './TagManager.jsx';
import NoteList from './NoteList.jsx';
import NoteEditor from './NoteEditor.jsx';
import SideBar from './SideBar.jsx';

const App = () => {

  const [username, setUsername] = useState('zlrhhj');
  const [tags, setTags] = useState([]);
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [filteredNotes, setFilteredNotes] = useState([...notes]);
  const [tag, setTag] = useState(null);
  const [notesNumByTag, setNotesNumbyTag] = useState({});//{tag1: num1, tag2: num2, ...
  const [count, setCount] = useState(0);
  const baseUrl = 'http://localhost:3000';
  const getTags = () => {
    axios.get(`${baseUrl}/api/tags`,{params:{user:username}}).then((response) => {
      console.log(response.data);
      setTags([...response.data]);
    })
    .catch((error) => {
      console.error('Error fetching tags:', error);
    });
  };
  const getNotes = () => {
    axios.get(`${baseUrl}/api/notes`,{params:{user:username}})
      .then((response) => {
        setNotes([...response.data]);
        setCount(response.data.length);
        response.data.forEach((note) => {
          note.tags.forEach((tag) => {
            if(notesNumByTag[tag]) {
              notesNumByTag[tag] += 1;
            } else {
              notesNumByTag[tag] = 1;
            }
          });
        });
        setFilteredNotes([...response.data]);
      })
      .catch((error) => {
        console.error('Error fetching notes:', error);
      });
  };
  useEffect(() => {
    getTags();
    getNotes();
  }, []);

  const filterByTags = (tag) => {
    if(tag){
      setTag(tag);
      const filtered = notes.filter((note)=> note.tags.includes(tag));
      console.log("filtered notes",filtered);
      setFilteredNotes(filtered);
    } else {
      setTag(null);
      setFilteredNotes([...notes]);
    }
  };

  const handleSearchNotes = (searchTerm) => {
    if(searchTerm.trim() === '') {
      setFilteredNotes([...notes]);
    } else {
      const filtered = notes.filter(note => note.title.toLowerCase().includes(searchTerm.toLowerCase()) || note.content.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredNotes(filtered);
    }
  };

  const handleAddTag = (newTag) => {

    axios.post(`${baseUrl}/api/tags`, { name: newTag, user: username }).then((response) => {
      setTags([...tags, response.data]);
    })
    .catch((error) => {
      console.error('Error adding tag:', error);
    });
  };

  const handleEditTag = (oldTag, newTag) => {
    console.log(oldTag,'\n', newTag);
    setTags(tags.map((tag) => {
      if (tag === oldTag) {
        axios.patch(`${baseUrl}/api/tags/${tag._id}`, { name: newTag }).then((response) => {
          console.log(response.data);
        })
        return { ...tag, name: newTag };
      }
      return tag;
    } ));

    setNotes(notes.map((note) => {

      if (note.tags.includes(oldTag.name)) {
        const newTags = note.tags.map((tag) => (tag === oldTag.name ? newTag : tag));
        axios.patch(`${baseUrl}/api/notes/${note._id}`, { tags: newTags})
          .then((response) => {
            console.log(response.data);
          })
        console.log("return ",{ ...note, tags: newTags});
        return { ...note, tags: newTags}
      } else {
        return note;
      }

    }));
    setFilteredNotes(filteredNotes.map((note) => {
      if (note.tags.includes(oldTag.name)) {
        const newTags = note.tags.map((tag) => (tag === oldTag.name ? newTag : tag));
        return { ...note, tags: newTags};
      } else {
        return note;
      }
    }));
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => {
      if (tag === tagToDelete) {
        axios.delete(`${baseUrl}/api/tags/${tag._id}`).then((response) => {
          console.log(response.data);
        })
        return false;
      }
      return true;

    }));
    setNotes(notes.map((note) => ({
      ...note,
      tags: note.tags.filter((tag) => {
        if (tag === tagToDelete.name) {
          axios.patch(`${baseUrl}/api/notes/${note._id}`,
            { tags: note.tags.filter((tag) => tag !== tagToDelete.name) })
            .then((response) => {
            console.log(response.data);
          })
          return false;
        }
        return true;
      })
    })));

    setFilteredNotes(filteredNotes.map((note) => ({
      ...note,
      tags: note.tags.filter((tag) => {
        if (tag === tagToDelete.name) {
          return false;
        }
        return true;
      })
    })));

  };

  const handleAddNote = () => {
    setEditingNote(null);
  };

  const handleEditNote = (note) => {
    console.log("editing note is ", note);
    setEditingNote(note);
  };

  const handleSaveNote = (note) => {
    if(note._id) {
      axios.patch(`${baseUrl}/api/notes/${note._id}`, note)
        .then((response) => {
          console.log('Note updated:', response.data);
        })
        .catch((error) => {
          console.error('Error updating note:', error);
        });
      setNotes(notes.map((existingNote) => (existingNote._id === note._id ? note : existingNote)));
      setFilteredNotes(filteredNotes.map((existingNote) => (existingNote._id === note._id ? note : existingNote)));
    }
    else {
      axios.post(`${baseUrl}/api/notes`, {...note, user: username})
        .then((response) => {
          setNotes([...notes, response.data]);
          setFilteredNotes([...notes, response.data]);
        })
        .catch((error) => {
          console.error('Error adding note:', error);
        });
    }

  };

  const handleDeleteNote = (noteId) => {
    setNotes(notes.filter((note) => note._id !== noteId));
    setFilteredNotes(filteredNotes.filter((note) => note._id !== noteId));
    axios.delete(`${baseUrl}/api/notes/${noteId}`)
    .then((response) => {
      console.log('Note deleted:', response.data);
    })
    .catch((error) => {
      console.error('Error deleting note:', error);
    });
  };
  const handleCancelNode = () => {
    console.log("Handle cancel node");
    setEditingNote(null);
  };

  const handleLogout = () => {
    setUsername('');
  };
  return (
    <div className="app">
      <Header username={username} onLogout={handleLogout} onSearch={handleSearchNotes} />
      <SideBar tags={tags} setFilters={filterByTags} tagNotes={notesNumByTag} no={count}/>
      <div className="main-content">
        <NoteList notes={filteredNotes} onEditNote={handleEditNote} onDeleteNote={handleDeleteNote} tag={tag}/>
        <NoteEditor note={editingNote} tags={tags} onSaveNote={handleSaveNote} onCancelNote={handleCancelNode}/>
        <TagManager tags={tags} onAddTag={handleAddTag} onEditTag={handleEditTag} onDeleteTag={handleDeleteTag} />
      </div>
    </div>
  );
}

export default App;
/*
          */