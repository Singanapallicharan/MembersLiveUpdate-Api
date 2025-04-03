import './seemem.css'
import React, { useEffect, useState } from 'react'
import axios from "axios";

const Seemember = () => {
  const [members, setMembers] = useState([]);

  // Function to fetch members
  const fetchMembers = async () => {
    try {
      const response = await axios.get(`https://eligo-members-eaea1-default-rtdb.firebaseio.com/profiles.json`);
      if (response.data) {
        const loadedMembers = Object.keys(response.data).map((key) => ({
          id: key,
          ...response.data[key]
        }));
        setMembers(loadedMembers);
      } else {
        setMembers([]); // If no data, set empty array
      }
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  // 🔹 Fetch members initially & refresh list when a new member is added
  useEffect(() => {
    fetchMembers();
    
    // 🔹 Refresh members list every 5 seconds (polling method)
    const interval = setInterval(fetchMembers, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Function to delete a member
  const deleteMember = async (id) => {
    try {
      await axios.delete(`https://eligo-members-eaea1-default-rtdb.firebaseio.com/profiles/${id}.json`);
      fetchMembers(); // ✅ Re-fetch members after deletion
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  return (
    <div className="see-member">
      <div className="topbar2"><center>See the Member</center></div>
      <div className='member-list'>
        <center><strong>Member List</strong></center>
        {members.length > 0 ? (
          <ul>
            {members.map(member => (
              <li key={member.id}>
                <p>Name: {member.name}</p>
                <p>Password: {member.password}</p>
                <p>Referrals: {member.referrals}</p>
                <p>EliGo Money: {member.eligo_money}</p>
                <button onClick={() => deleteMember(member.id)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No members found</p>
        )}
      </div>
    </div>
  );
}

export default Seemember;
