import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faPaintRoller, faSignOutAlt, faUsers, faAlignCenter } from '@fortawesome/free-solid-svg-icons';
import '../stylesheets/customization.css';

const Customization = () => {
  console.log('Rendering Customization component');
  const [openSidebar, setOpenSidebar] = useState(true);
  const [primaryColor, setPrimaryColor] = useState(() => localStorage.getItem('customizationColor') || '#ab20fd');

  const handleCustomizationUpdate = () => {
    try {
      console.log('Updating customization color:', primaryColor);
      // Save the customization color in local storage
      localStorage.setItem('customizationColor', primaryColor);
  
      // Apply the background color directly to the root element
      const rootElement = document.getElementById('root');
      if (rootElement) {
        rootElement.style.backgroundColor = primaryColor;
      }
  
      // Set the background color for the body
      document.body.style.backgroundColor = primaryColor;
  
      // Dispatch a custom event to notify other components
      document.dispatchEvent(new CustomEvent('updateAppColor', { detail: primaryColor }));
      console.log('Color updated:', primaryColor);

    } catch (error) {
      console.error('An error occurred during customization update:', error.message);
      // Handle error state or display a message to the user
    }
  };
  
  
  // Cleanup: Set the background color back to the default when the component unmounts
  useEffect(() => {
    return () => {
      // Retrieve the default color from local storage or use a default value
      const defaultColor = '#ffffff'; // Replace with your default color
      document.body.style.backgroundColor = defaultColor;
    };
  }, []);


  return (
    <div>
      {/* Sidebar */}
      <div className="sidebar" style={{ width: openSidebar ? '80px' : '0', backgroundColor: '#ab20fd' }}>
        <span className="close-btn" onClick={() => setOpenSidebar(false)}>
          &times;
        </span>
        <Link to="/admin" onClick={() => setOpenSidebar(true)}>
          <FontAwesomeIcon icon={faHouse} size="lg" />
        </Link>
        <Link to="/register" onClick={() => setOpenSidebar(true)}>
          <FontAwesomeIcon icon={faUser} size="lg" />
        </Link>
        <Link to="/users" onClick={() => setOpenSidebar(true)}>
          <FontAwesomeIcon icon={faUsers} size="lg" />
        </Link>
        <Link to="/customization" onClick={() => setOpenSidebar(true)}>
          <FontAwesomeIcon icon={faPaintRoller} size="lg" />
        </Link>
        <Link to="/" onClick={() => setOpenSidebar(true)}>
          <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
        </Link>
      </div>

      {/* Content for Customization page */}
      <div className="main-content" style={{ marginLeft: openSidebar ? "80px" : "0"}}>
        <h1>Welcome to the Customization Page</h1>
        {/* Input field to update PrimaryColor */}
        <input
          type="color"
          value={primaryColor}
          onChange={(e) => setPrimaryColor(e.target.value)}
        />
        {/* Button to trigger customization update */}
        <button onClick={handleCustomizationUpdate}>Update Customization</button>
        {/* Add any other content specific to the Customization page */}
      </div>
    </div>
  );
};
export default Customization;