import React, {useState,useEffect} from 'react';

const SideBar = ({tags, setFilters, tagNotes, no}) => {

  const handleTagClick = (tagName) => {
    console.log(tagName);
    setFilters(tagName);
  };
  return(
    <div>
      <aside className="sidebar">
        <nav>
          <ul>
            <li onClick={()=>{handleTagClick(null)}}>All Notes ({no})</li>
            <li>Notes by Tag</li>
            <ul>
              {tags.map((tag, index) => (
                <li key={index} onClick={()=>{handleTagClick(tag.name)}}>{tag.name} ({tagNotes[tag.name] ? tagNotes[tag.name] : 0 })</li>
              ))}
              </ul>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default SideBar;