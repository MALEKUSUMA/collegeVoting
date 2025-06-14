// import "./Choose.css";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// function Choose() {
//   const [userData, setuserData] = useState([]);
//   const navigate=useNavigate();
//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const user = localStorage.getItem("user");
//         const response = await axios.get(
//           `http://localhost:8085/auth/student/{registerNumber}=${user}`
//         );
//         setuserData(response.data);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };
//     fetch();
//   }, []);
//   const [selectedOption, setSelectedOption] = useState(null);

//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value);
//   };


//   const handleNextButtonClick = () => {
//     const user = localStorage.getItem("user");
//     if (selectedOption === "vote") {
//       window.location.href = "/vote-page";
//     } else if (selectedOption === "participate") {
      
//       navigate("/participate-page", { state: { user } });
//     }
//   };
//   return (
//     <div id="container">
//       <div className="profile-vote-box">
//         <div className="profile-box">
//           <img src="profile_photo.png" alt="" />
//           <h3>NAME:Kusuma</h3>
//           <h3>REG NO: 22B01A1290</h3>
//           <h3>Branch: IT</h3>
//         </div>

//         <div className="voting-box">
//           <h2>Choose an option:</h2>
//           <select onChange={handleOptionChange}>
//             <option value="Select One">-</option>
//             <option value="vote">Vote</option>
//             <option value="participate">Nominate</option>
//           </select>
//           <button className="hello" onClick={handleNextButtonClick}>Next</button>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Choose;




import "./Choose.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Choose() {
  const [userData, setUserData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const user = localStorage.getItem("user");
        if (!user) return;
        
        const response = await axios.get(
          `http://localhost:8085/auth/student/${user}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetch();
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleNextButtonClick = () => {
    const user = localStorage.getItem("user");
    if (selectedOption === "vote") {
      window.location.href = "/vote-page";
    } else if (selectedOption === "participate") {
      navigate("/participate-page", { state: { user } });
    }
  };

  return (
    <div id="container">
      <div className="profile-vote-box">
        <div className="profile-box">
          <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=faces&fit=crop&w=150&h=150" alt="profile" />
          <h3>NAME: {userData?.name || "Kusuma"}</h3>
          <h3>REG NO: {userData?.registerNumber || "22B01A1290"}</h3>
          <h3>Branch: {userData?.branch || "Information Technology"}</h3>
        </div>

        <div className="voting-box">
          <h2>Choose an option:</h2>
          <select onChange={handleOptionChange} defaultValue="Select One">
            <option disabled value="Select One">Select One</option>
            <option value="vote">Vote</option>
            <option value="participate">Nominate</option>
          </select>
          <button className="hello" onClick={handleNextButtonClick}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Choose;

