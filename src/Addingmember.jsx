import axios from "axios";
import './addmember.css';
import React, { useState } from 'react';

const Addingmember = () => {
  const [profiles, setProfiles] = useState({
    // Personal Information
    name: '',
    dob: '',
    gender: '',
    nationality: '',
    maritalStatus: '',
    profilePicture: '/employee1.jpg',
    
    // Contact Information
    phone: '',
    email: '',
    address: '',
    pincode: '',
    age: '',
    
    // Work Information
    employeeId: '',
    department: 'Information Technology',
    role: '',
    level: '',
    managerName: 'Jay P',
    officeLocation: 'Visakhapatnam',
    doj: '',
    employeeType: 'Part Time',
    status: 'Active',
    
    // Account Information
    password: '',
    
    // Earnings Information
    referrals: 0,
    eligo_money: 0,
    employeeContribution: 0,
    eligoContribution: 0,
    
    // Payoff Information
    paidDays: []
  });

  const inputHandler = (e) => {
    setProfiles({ ...profiles, [e.target.name]: e.target.value });
  };

  const handleNumberChange = (field, value) => {
    if (field === 'paidDays') {
      // Special handling for paidDays to maintain array structure
      const currentDays = Array.isArray(profiles.paidDays) ? profiles.paidDays : [];
      const newValue = Math.max(0, (currentDays.length || 0) + value);
      setProfiles({
        ...profiles,
        paidDays: Array(newValue).fill().map((_, i) => i + 1) // Creates [1, 2, ..., newValue]
      });
    } else {
      // Normal number handling for other fields
      const newValue = Math.max(0, (profiles[field] || 0) + value);
      setProfiles({ ...profiles, [field]: newValue });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://eligo-members-eaea1-default-rtdb.firebaseio.com/profiles.json`,
        profiles
      );
      console.log("Data Saved Successfully:", response.data);
      alert("Member added successfully!");
      // Reset form after successful submission
      setProfiles({
        ...profiles,
        name: '',
        dob: '',
        gender: '',
        nationality: '',
        maritalStatus: '',
        phone: '',
        email: '',
        address: '',
        pincode: '',
        age: '',
        employeeId: '',
        role: '',
        level: '',
        doj: '',
        password: '',
        referrals: 0,
        eligo_money: 0,
        employeeContribution: 0,
        eligoContribution: 0,
        paidDays: []
      });
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to add member.");
    }
  };

  return (
    <div className="add-member">
      <div className="topbar"><center>Add New Member</center></div>
      
      <div className="form-container">
        <form onSubmit={submitHandler}>
          
          {/* Personal Information Section */}
          <fieldset className="scroll-section">
            <legend>Personal Information</legend>
            <div className="form-group">
              <label>Full Name</label>
              <input name="name" value={profiles.name} onChange={inputHandler} placeholder="Enter full name" required />
            </div>
            
            <div className="form-group">
              <label>Date of Birth</label>
              <input type="date" name="dob" value={profiles.dob} onChange={inputHandler} required />
            </div>
            
            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={profiles.gender} onChange={inputHandler} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Nationality</label>
              <input name="nationality" value={profiles.nationality} onChange={inputHandler} placeholder="Enter nationality" />
            </div>
            
            <div className="form-group">
              <label>Marital Status</label>
              <select name="maritalStatus" value={profiles.maritalStatus} onChange={inputHandler}>
                <option value="">Select Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
              </select>
            </div>
            

          {/* Contact Information Section */}
          <fieldset className="scroll-section">
            <legend>Contact Information</legend>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" value={profiles.phone} onChange={inputHandler} placeholder="Enter phone number" required />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={profiles.email} onChange={inputHandler} placeholder="Enter email" required />
            </div>
            
            <div className="form-group">
              <label>Address</label>
              <textarea name="address" value={profiles.address} onChange={inputHandler} placeholder="Enter full address" rows="3"></textarea>
            </div>
            
            <div className="form-group">
              <label>Pincode</label>
              <input name="pincode" value={profiles.pincode} onChange={inputHandler} placeholder="Enter pincode" />
            </div>
            
            <div className="form-group">
              <label>Age</label>
              <input type="number" name="age" value={profiles.age} onChange={inputHandler} placeholder="Enter age" min="18" max="70" />
            </div>
          </fieldset>

          {/* Work Information Section */}
          <fieldset className="scroll-section">
            <legend>Work Information</legend>
            <div className="form-group">
              <label>Employee ID</label>
              <input name="employeeId" value={profiles.employeeId} onChange={inputHandler} placeholder="Enter employee ID" required />
            </div>
            
            <div className="form-group">
              <label>Department</label>
              <input name="department" value={profiles.department} onChange={inputHandler} placeholder="Enter department" required />
            </div>
            
            <div className="form-group">
              <label>Role/Designation</label>
              <input name="role" value={profiles.role} onChange={inputHandler} placeholder="Enter role" required />
            </div>
            
            <div className="form-group">
              <label>Level</label>
              <input name="level" value={profiles.level} onChange={inputHandler} placeholder="Enter level" />
            </div>
            
            <div className="form-group">
              <label>Reporting Manager</label>
              <input name="managerName" value={profiles.managerName} onChange={inputHandler} placeholder="Enter manager's name" />
            </div>
            
            <div className="form-group">
              <label>Office Location</label>
              <input name="officeLocation" value={profiles.officeLocation} onChange={inputHandler} placeholder="Enter office location" />
            </div>
            
            <div className="form-group">
              <label>Date of Joining</label>
              <input type="date" name="doj" value={profiles.doj} onChange={inputHandler} required />
            </div>
            
            <div className="form-group">
              <label>Employee Type</label>
              <select name="employeeType" value={profiles.employeeType} onChange={inputHandler} required>
                <option value="Part Time">Part Time</option>
                <option value="Full Time">Full Time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Employment Status</label>
              <select name="status" value={profiles.status} onChange={inputHandler}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
          </fieldset>

          {/* Account & Earnings Section */}
          <fieldset className="scroll-section">
            <legend>Account & Earnings</legend>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" value={profiles.password} onChange={inputHandler} placeholder="Enter password" required />
            </div>
            
            <div className="form-group">
              <label>Referrals Count</label>
              <div className="number-input">
                <button type="button" onClick={() => handleNumberChange('referrals', -1)}>-</button>
                <input type="number" name="referrals" value={profiles.referrals} onChange={inputHandler} min="0" />
                <button type="button" onClick={() => handleNumberChange('referrals', 1)}>+</button>
              </div>
            </div>
            
            <div className="form-group">
              <label>Eligo Money Balance</label>
              <div className="number-input">
                <button type="button" onClick={() => handleNumberChange('eligo_money', -100)}>-100</button>
                <input type="number" name="eligo_money" value={profiles.eligo_money} onChange={inputHandler} min="0" />
                <button type="button" onClick={() => handleNumberChange('eligo_money', 100)}>+100</button>
              </div>
            </div>
            </fieldset>

            
            <div className="form-group">
              <label>Employee Contributions (₹)</label>
              <div className="number-input">
                <button type="button" onClick={() => handleNumberChange('employeeContribution', -1000)}>-1k</button>
                <input type="number" name="employeeContribution" value={profiles.employeeContribution} onChange={inputHandler} min="0" />
                <button type="button" onClick={() => handleNumberChange('employeeContribution', 1000)}>+1k</button>
              </div>
            </div>
            
            <div className="form-group">
              <label>Eligo Contributions (₹)</label>
              <div className="number-input">
                <button type="button" onClick={() => handleNumberChange('eligoContribution', -1000)}>-1k</button>
                <input type="number" name="eligoContribution" value={profiles.eligoContribution} onChange={inputHandler} min="0" />
                <button type="button" onClick={() => handleNumberChange('eligoContribution', 1000)}>+1k</button>
              </div>
            </div>
            
            <div className="form-group">
            <label>Paid Days</label>
            <div className="number-input">
              <button type="button" onClick={() => handleNumberChange('paidDays', -1)}>-1</button>
              <input 
                type="number" 
                name="paidDays" 
                value={Array.isArray(profiles.paidDays) ? profiles.paidDays.length : 0} 
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0;
                  setProfiles({
                    ...profiles,
                    paidDays: Array(val).fill().map((_, i) => i + 1)
                  });
                }} 
                min="0" 
              />
              <button type="button" onClick={() => handleNumberChange('paidDays', 1)}>+1</button>
            </div>
          </div>
          </fieldset>

          <div className="submit-btn-container">
            <button type="submit" className="submit-btn">Save Member</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addingmember;