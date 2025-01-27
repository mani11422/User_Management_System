// main.js
import { validateUserForm } from "./validation.js";

const API_URL = "https://jsonplaceholder.typicode.com/users";

const userTable = document.getElementById("userTable");
const userForm = document.getElementById("userForm");
const modalTitle = document.getElementById("modalTitle");
const errorMessages = document.getElementById("errorMessages");

let editingUserId = null;

// Fetch and display all users
const fetchUsers = async () => {
  try {
    const response = await fetch(API_URL);
    const users = await response.json();

    renderUserTable(users);
  } catch (error) {
    alert("Error fetching users. Please try again later.");
    console.error(error);
  }
};

// Render user table
const renderUserTable = (users) => {
  userTable.innerHTML = users
    .map(
      (user) => `
    <tr>
      <td>${user.id}</td>
      <td>${user.name.split(" ")[0]}</td>
      <td>${user.name.split(" ")[1]}</td>
      <td>${user.email}</td>
      <td>${user.department || "N/A"}</td>
      <td>
        <button class="btn btn-primary btn-sm" onclick="openEditForm(${user.id})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Delete</button>
      </td>
    </tr>
  `
    )
    .join("");
};

// Open form for adding or editing a user
window.openEditForm = (id = null) => {
  editingUserId = id;
  modalTitle.textContent = id ? "Edit User" : "Add User";
  userForm.reset();
  errorMessages.innerHTML = "";

  if (id) {
    fetch(`${API_URL}/${id}`)
      .then((response) => response.json())
      .then((user) => {
        const [firstName, lastName] = user.name.split(" ");
        userForm.firstName.value = firstName;
        userForm.lastName.value = lastName;
        userForm.email.value = user.email;
        userForm.department.value = user.department || "";
      })
      .catch((error) => console.error("Error fetching user details:", error));
  }
};

// Handle form submission
userForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userData = {
    firstName: userForm.firstName.value.trim(),
    lastName: userForm.lastName.value.trim(),
    email: userForm.email.value.trim(),
    department: userForm.department.value.trim(),
  };

  const { isValid, errors } = validateUserForm(userData);

  if (!isValid) {
    errorMessages.innerHTML = errors
      .map((error) => `<li>${error}</li>`)
      .join("");
    return;
  }

  try {
    const method = editingUserId ? "PUT" : "POST";
    const url = editingUserId ? `${API_URL}/${editingUserId}` : API_URL;

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...userData,
        name: `${userData.firstName} ${userData.lastName}`,
      }),
    });

    if (response.ok) {
      alert(editingUserId ? "User updated successfully!" : "User added successfully!");
      fetchUsers();
    } else {
      throw new Error("Failed to save user.");
    }
  } catch (error) {
    alert("Error saving user. Please try again.");
    console.error(error);
  }

  userForm.reset();
  editingUserId = null;
});

// Delete a user
window.deleteUser = async (id) => {
  if (!confirm("Are you sure you want to delete this user?")) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("User deleted successfully!");
      fetchUsers();
    } else {
      throw new Error("Failed to delete user.");
    }
  } catch (error) {
    alert("Error deleting user. Please try again.");
    console.error(error);
  }
};

// Fetch users on page load
fetchUsers();
