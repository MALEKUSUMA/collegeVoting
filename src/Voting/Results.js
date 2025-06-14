



import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Results() {
  const [topCandidates, setTopCandidates] = useState([]);

  useEffect(() => {
    const fetchTopCandidates = () => {
      axios
        .get('http://localhost:8081/api/nominees/top')
        .then((response) => {
          setTopCandidates(response.data);
        })
        .catch((error) => {
          console.error('Error fetching top candidates:', error);
        });
    };

    fetchTopCandidates(); // Initial fetch
    const intervalId = setInterval(fetchTopCandidates, 5000); // Update every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div style={pageContainerStyle}>
      <h2>Top 3 Candidates</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Rank</th>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Votes Received</th>
          </tr>
        </thead>
        <tbody>
          {topCandidates.map((candidate, index) => (
            <tr key={candidate.id || index}>
              <td style={tableCellStyle}>{index + 1}</td>
              <td style={tableCellStyle}>{candidate.name}</td>
              <td style={tableCellStyle}>{candidate.votes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// CSS styles as JavaScript objects
const pageContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '20px auto',
};

const tableStyle = {
  width: '50%',
  borderCollapse: 'collapse',
  marginTop: '20px',
};

const tableHeaderStyle = {
  background: '#004080',
  color: 'white',
  padding: '10px',
  textAlign: 'center',
};

const tableCellStyle = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
  textAlign: 'center',
};

export default Results;
