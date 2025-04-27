document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const partnerId = document.getElementById('partnerId').value;
  const role = document.getElementById('role').value;
  const errorElement = document.getElementById('login-error');

  // Clear previous error messages
  errorElement.textContent = '';

  // Validation
  if (!username) {
    errorElement.textContent = 'Username is required.';
    return;
  }
  if (!partnerId) {
    errorElement.textContent = 'Partner ID is required.';
    return;
  }
  if (!role) {
    errorElement.textContent = 'Role is required.';
    return;
  }

  // Simulate login success
  document.getElementById('login-page').style.display = 'none';
  document.getElementById('search-page').style.display = 'block';

  const userDropdown = document.getElementById('user-dropdown');
  const loggedInUser = document.getElementById('logged-in-user');
  const userDetailsDropdown = document.getElementById('user-details-dropdown');

  loggedInUser.textContent = `Logged in as: ${username}`;
  userDetailsDropdown.innerHTML = `
    <option value="partnerId">Partner ID: ${partnerId}</option>
    <option value="role">Role: ${role}</option>
  `;
  userDropdown.style.display = 'block';
});

document.getElementById('logout-button').addEventListener('click', () => {
  document.getElementById('login-page').style.display = 'block';
  document.getElementById('search-page').style.display = 'none';
  document.getElementById('user-dropdown').style.display = 'none';
});
