



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Vote.css'; // Make sure this file exists and styles properly
import { useNavigate } from 'react-router-dom';

function VotePage() {
  const [participants, setParticipants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/api/nominees/all')
      .then((response) => {
        setParticipants(response.data.map((participant) => ({
          ...participant,
          votes: 0, // Optional: Add vote count if needed
        })));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleVote = async (registerNumber) => {
    try {
      console.log(registerNumber);

      const response = await axios.post('http://localhost:8081/api/nominees/vote', { registerNumber });
      console.log(response.data);

      navigate('/thanksv');
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };

  return (
    <div>
      <h2>Nominees Details</h2>
      <br />
      <div className="participant-grid">
        {participants.map((participant) => (
          <div key={participant.id} className="participant-box">
            <strong>Name:</strong> {participant.name}<br /><br />
            <strong>Register Number:</strong> {participant.registerNumber}<br /><br />
            <strong>Skills:</strong> {participant.skills}<br /><br />
            <strong>Abilities:</strong> {participant.highlights}<br />
            <img className="i" src={participant.voteSymbolUrl} alt="Vote Symbol" />
            <button className="bye" onClick={() => handleVote(participant.registerNumber)}>Vote</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VotePage;


