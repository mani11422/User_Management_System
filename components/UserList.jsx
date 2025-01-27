import React from 'react';

const UserList = ({ users, onDelete }) => (
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Department</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.firstName} {user.lastName}</td>
          <td>{user.email}</td>
          <td>{user.department}</td>
          <td>
            <button onClick={() => onDelete(user.id)}>Delete</button>
            <button onClick={() => window.location.href = `/edit-user/${user.id}`}>Edit</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default UserList;
