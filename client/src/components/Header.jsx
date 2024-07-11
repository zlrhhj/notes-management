import React, {useState} from 'react';
import logoImage from '../assets/Notes-logo.png';

const Header = ({username, onLogout, onSearch}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return(
    <header>
      <div className="logo">

        <h2><img src={logoImage} alt="Notes App Logo"/>Notes App</h2>
      </div>
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search notes..."
        />
      </div>
      <div className="user-info">
        <span>Welcome, {username}!</span>
        <button onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;