import './seemem.css';
import React, { useEffect, useState } from 'react';
import axios from "axios";

const Seemember = () => {
  const [members, setMembers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Fetch members
  const fetchMembers = async () => {
    try {
      const response = await axios.get(`https://eligo-members-eaea1-default-rtdb.firebaseio.com/profiles.json`);
      if (response.data) {
        const loadedMembers = Object.keys(response.data).map((key) => ({
          id: key,
          ...response.data[key]
        }));
        setMembers(loadedMembers);
      }
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  useEffect(() => {
    fetchMembers();
    const interval = setInterval(fetchMembers, 5000);
    return () => clearInterval(interval);
  }, []);

  // Delete member
  const deleteMember = async (id) => {
    try {
      await axios.delete(`https://eligo-members-eaea1-default-rtdb.firebaseio.com/profiles/${id}.json`);
      fetchMembers();
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  // Start editing
  const startEditing = (member) => {
    setEditingId(member.id);
    setEditForm({
      name: member.name || '',
      email: member.email || '',
      password: member.password || '',
      employeeId: member.employeeId || '',
      role: member.role || '',
      // Include account fields:
      referrals: member.referrals || 0,
      eligo_money: member.eligo_money || 0,
      paidDays: member.paidDays || 0,
      // Include other fields as needed
      department: member.department || '',
      status: member.status || 'Active'
    });
  };

  // Handle edit form changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: ['eligo_money', 'referrals', 'paidDays'].includes(name) 
        ? Number(value) || 0 
        : value
    }));
  };

  // Save edited member
  const saveEdit = async (id) => {
    try {
      // Update both the editForm data AND account fields
      const updateData = {
        ...editForm,
        eligo_money: Number(editForm.eligo_money) || 0,
        referrals: Number(editForm.referrals) || 0,
        paidDays: Number(editForm.paidDays) || 0
      };
  
      await axios.patch(
        `https://eligo-members-eaea1-default-rtdb.firebaseio.com/profiles/${id}.json`,
        updateData
      );
      
      setEditingId(null);
      fetchMembers(); // Refresh the data
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Error updating member:", error);
      alert("Failed to save changes");
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
  };
  const updateAccountValue = async (id, field, change) => {
    const member = members.find(m => m.id === id);
    const currentValue = member[field] || 0;
    const newValue = Math.max(0, currentValue + change);
    
    try {
      await axios.patch(
        `https://eligo-members-eaea1-default-rtdb.firebaseio.com/profiles/${id}.json`,
        { [field]: newValue }
      );
      fetchMembers(); // Refresh the list
    } catch (error) {
      console.error("Error updating account value:", error);
    }
  };

  const handleAccountChange = async (id, field, value) => {
    try {
      await axios.patch(
        `https://eligo-members-eaea1-default-rtdb.firebaseio.com/profiles/${id}.json`,
        { [field]: Number(value) || 0 }
      );
      fetchMembers(); // Refresh the list
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  return (
    <div className="see-member">
      <div className="topbar2"><center>Member Dashboard</center></div>
      <div className='member-list'>
        <center><h2>Member List</h2></center>
        {members.length > 0 ? (
          <div className="members-grid">
            {members.map(member => (
              <div key={member.id} className="member-card">
                {editingId === member.id ? (
                  <div className="edit-form">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        name="name"
                        value={editForm.name}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        name="email"
                        value={editForm.email}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        name="password"
                        value={editForm.password}
                        onChange={handleEditChange}
                        type="password"
                      />
                    </div>
                    <div className="form-group">
                      <label>Employee ID</label>
                      <input
                        name="employeeId"
                        value={editForm.employeeId}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Role</label>
                      <input
                        name="role"
                        value={editForm.role}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Referrals</label>
                      <input
                        name="referrals"
                        type="number"
                        value={editForm.referrals}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Eligo Money</label>
                      <input
                        name="eligo_money"
                        type="number"
                        value={editForm.eligo_money}
                        onChange={handleEditChange}
                      />
                    </div>
                    {/* Account Section - Daily Updates */}
                    <div className="account-section">
                      <h4>Daily Account Updates</h4>
                      <div className="account-fields">
                        <div className="account-field">
                          <label>Eligo Money</label>
                          <div className="number-input">
                            <button type="button" onClick={() => updateAccountValue(member.id, 'eligo_money', -100)}>-100</button>
                            <input 
                              type="number" 
                              value={member.eligo_money || 0} 
                              onChange={(e) => handleAccountChange(member.id, 'eligo_money', e.target.value)}
                            />
                            <button type="button" onClick={() => updateAccountValue(member.id, 'eligo_money', 100)}>+100</button>
                          </div>
                        </div>
                        <div className="account-field">
                          <label>Referrals</label>
                          <div className="number-input">
                            <button type="button" onClick={() => updateAccountValue(member.id, 'referrals', -1)}>-1</button>
                            <input 
                              type="number" 
                              value={member.referrals || 0} 
                              onChange={(e) => handleAccountChange(member.id, 'referrals', e.target.value)}
                            />
                            <button type="button" onClick={() => updateAccountValue(member.id, 'referrals', 1)}>+1</button>
                          </div>
                        </div>
                        <div className="account-field">
                          <label>Paid Days</label>
                          <div className="number-input">
                            <button type="button" onClick={() => updateAccountValue(member.id, 'paidDays', -1)}>-1</button>
                            <input 
                              type="number" 
                              value={member.paidDays || 0} 
                              onChange={(e) => handleAccountChange(member.id, 'paidDays', e.target.value)}
                            />
                            <button type="button" onClick={() => updateAccountValue(member.id, 'paidDays', 1)}>+1</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="edit-actions">
                      <button onClick={() => saveEdit(member.id)} className="save-btn">
                        Save
                      </button>
                      <button onClick={cancelEdit} className="cancel-btn">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3>{member.name}</h3>
                    <p><strong>Email:</strong> {member.email}</p>
                    <p><strong>Employee ID:</strong> {member.employeeId}</p>
                    <p><strong>Phone no.:</strong> {member.phone}</p>
                    <p><strong>Role:</strong> {member.role}</p>
                    <p><strong>Referrals:</strong> {member.referrals}</p>
                    <p><strong>Eligo Money:</strong> ₹{member.eligo_money}</p>
                    <div className="member-actions">
                      <button onClick={() => startEditing(member)} className="edit-btn">
                        Edit
                      </button>
                      <button onClick={() => deleteMember(member.id)} className="delete-btn">
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No members found</p>
        )}
      </div>
    </div>
  );
};

export default Seemember;