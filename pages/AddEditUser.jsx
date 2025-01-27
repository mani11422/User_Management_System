import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserForm from '../components/UserForm';
import { getUserById, addUser, editUser } from '../services/userService';

const AddEditUser = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await getUserById(id);
          setUser(response.data);
        } catch (err) {
          setError('Failed to fetch user.');
        }
      };
      fetchUser();
    }
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      if (id) {
        await editUser(id, formData);
        alert('User updated successfully.');
      } else {
        await addUser(formData);
        alert('User added successfully.');
      }
      navigate('/');
    } catch (err) {
      alert('Failed to save user.');
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit User' : 'Add User'}</h2>
      {error && <p className="error">{error}</p>}
      <UserForm user={user} onSubmit={handleSubmit} />
    </div>
  );
};

export default AddEditUser;
