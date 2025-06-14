import React from 'react';
import './Thanksvote.css'; 
import { useNavigate } from 'react-router-dom';
function Thanksvote() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    
    navigate('/');
  };
  return (
    <div className="thank-you-container">
      <h2 className="thank-you-heading">📣🎉Thank you for VOTING🎉📣</h2>
      <p className="thank-you-message">Your vote has been recorded.</p>
      
       <button className="thank-you-button" onClick={handleBackToHome}>Back to Home</button> 
    </div>
  );
}

export default Thanksvote;