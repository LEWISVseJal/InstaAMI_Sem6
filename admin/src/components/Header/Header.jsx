import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import userImage from '../../assets/profile.png';
import { logOut } from "../../actions/AuthAction";
import { useDispatch } from "react-redux";


const Header = () => {
  // State to manage dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Call the logout function
    dispatch(logOut());
    // Close the dropdown
    setDropdownOpen(false);
    // Redirect to the logout page if needed
    // window.location.href = '/logout';
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.navbar}>
        <Link to="/" style={styles.brand}>Instaami</Link>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link to="/user" style={styles.navLink}>User</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/admin" style={styles.navLink}>Admin</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/post" style={styles.navLink}>Post</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/analytics" style={styles.navLink}>Analytics</Link>
          </li>
        </ul>
        <div style={styles.dropdown} onClick={toggleDropdown}>
          <img src={userImage} alt="User" style={styles.profileImage} />
          {dropdownOpen && (
            <div style={styles.dropdownContent}>
              <p><Link style={styles.dropdownLink} to="/setting">Settings</Link></p>
              <p><Link style={styles.dropdownLink} onClick={handleLogout}>Logout</Link></p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#fff',
    color: '#000',
    padding: '10px 0',
    width: '100%',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 40px', // Increased padding
    width: '100%',
  },
  brand: {
    textDecoration: 'none',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#000',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginLeft: '30px', // Increased gap between items
  },
  navLink: {
    textDecoration: 'none',
    color: '#000',
    fontSize: '20px',
  },
  dropdown: {
    position: 'relative',
    marginLeft: '30px', // Increased gap between nav items and dropdown
    cursor: 'pointer',
  },
  profileImage: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
  },
  dropdownContent: {
    position: 'absolute',
    top: '40px',
    right: '0',
    backgroundColor: '#f9f9f9',
    minWidth: '150px', // Increased width
    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
    zIndex: 1,
  },
  dropdownLink: {
    textDecoration: 'none',
    color: '#333',
    padding: '10px',
    display: 'block',
  },
};

export default Header;
