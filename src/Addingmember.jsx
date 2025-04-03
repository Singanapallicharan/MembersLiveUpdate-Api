import axios from "axios";
import './addmember.css';
import React, { useState } from 'react';

const Addingmember = () => {
  const [profiles, setProfiles] = useState({
    name: '',
    password: '',
    phone: '',
    email: '',
    location: '',
    eligo_money: '',
    referrals: ''
  });

  // Handle Input Change
  const inputHandler = (e) => {
    setProfiles({ ...profiles, [e.target.name]: e.target.value });
  };

  // Handle Form Submission (POST Request)
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://eligo-members-eaea1-default-rtdb.firebaseio.com/profiles.json`,
        profiles
      );
      console.log("Data Saved Successfully:", response.data);
      alert("Member added successfully!");  // ✅ Success message
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to add member.");  // ❌ Error message
    }
  };

  return (
    <div className="add-member">
      <div className="topbar"><center>Ikkada Add chesko!!</center></div>
      <div className="addform">
        <form onSubmit={submitHandler}>
          <label>Name</label>
          <input name="name" value={profiles.name} onChange={inputHandler} placeholder="Enter the name" />

          <label>Password</label>
          <input name="Password" value={profiles.password} onChange={inputHandler} placeholder="Enter the password" />

          <label>Email</label>
          <input name="email" value={profiles.email} onChange={inputHandler} placeholder="Enter the Email" />

          <label>Location</label>
          <input name="location" value={profiles.location} onChange={inputHandler} placeholder="Enter the location" />

          <label>Eligo Money</label>
          <input name="eligo_money" value={profiles.eligo_money} onChange={inputHandler} placeholder="Enter the amount" />

          <label>Referrals</label>
          <input name="referrals" value={profiles.referrals} onChange={inputHandler} placeholder="Enter no. of referrals" />

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default Addingmember;
