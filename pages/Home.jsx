import React, { useEffect, useState } from 'react';
import UserList from '../components/UserList';
import { getUsers, deleteUser } from '../services/userService';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users.');
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setError('Failed to delete user.');
    }
  };

  return (
    <div>
      <h2>User List</h2>
      {error && <p className="error">{error}</p>}
      <UserList users={users} onDelete={handleDelete} />
    </div>
  );
};

export default Home;
