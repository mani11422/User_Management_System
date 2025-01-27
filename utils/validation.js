// validation.js

/**
 * Validates user input in the add/edit form.
 * @param {Object} userData - The user data object containing fields: firstName, lastName, email, department.
 * @returns {Object} - Returns an object with isValid and errors array.
 */
export const validateUserForm = (userData) => {
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Check for first name
    if (!userData.firstName || userData.firstName.trim() === "") {
      errors.push("First Name is required.");
    }
  
    // Check for last name
    if (!userData.lastName || userData.lastName.trim() === "") {
      errors.push("Last Name is required.");
    }
  
    // Check for email
    if (!userData.email || userData.email.trim() === "") {
      errors.push("Email is required.");
    } else if (!emailRegex.test(userData.email)) {
      errors.push("Invalid email format.");
    }
  
    // Check for department
    if (!userData.department || userData.department.trim() === "") {
      errors.push("Department is required.");
    }
  
    return {
      isValid: errors.length === 0,
      errors,
    };
  };
  