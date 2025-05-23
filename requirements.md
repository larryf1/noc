# AI NOC

This goal of this application is to generate almost all the actual code with AI.

The goal is to begin to develop a replacement for an existing application, 
but it is fraught with security challenges and doesn't provide the level
of partner isolation that is required.

The user of the application can either be logged in or not.  
**Authentication and authorization must be handled via SSO using Microsoft Azure as the Identity Provider (IDP).**  
If the user is not logged in, display a login page that initiates the SSO flow with Azure.  
Once the user is authenticated via Azure, retrieve their partner IDs and roles from Azure claims or group membership, and display the search page.

There is no server-side component in this implementation. The application will (eventually) communicate with
other services via REST APIs, but for now, the application will be a single-page application written in JavaScript.

The application will be a single-page application (SPA) written in JavaScript, using a modern framework like React or Vue.js.

The application should be responsive and work on both desktop and mobile devices.

The application should be designed with the following principles in mind:
- **Security**: The application should be designed with security in mind, including input validation, authentication, and authorization.  
  **Authentication and authorization must leverage Microsoft Azure SSO modules.**
- **Usability**: The application should be easy to use and navigate, with clear error messages and validation.
- **Performance**: The application should be designed for performance, with fast load times and minimal latency.
- **Scalability**: The application should be designed to scale, with the ability to handle large amounts of data and users.
- **Maintainability**: The application should be designed to be maintainable, with a clear code structure and documentation.
- **Testability**: The application should be designed to be testable, with unit tests and integration tests.
- **Extensibility**: The application should be designed to be extensible, with the ability to add new features and functionality in the future.

The overall look and feel of the application can be built with Bootstrap or Material UI.  

There should be a small header with the name of the application, and a footer with the version number. The header should be fixed to the top of the page, 
and the footer should be fixed to the bottom of the page.
The header and footer are 2–3 times as tall as they need to be. At the top, make sure it doesn't obstruct the 
top of the page.

Below the header, there should be a main content area that will display the login page or the search page, depending on whether the user is logged in or not.

There should also be a dropdown menu in the header that allows the user to select their partner ID and role.  
**This dropdown should be populated with the partner IDs and roles retrieved from Azure after successful authentication.**  
The selected partner ID and role should be displayed in the header, along with the username of the logged-in user.

Once the user is logged in, there should be a logout button in the header that allows the user to log out. When the user logs out, the application should redirect to the login page and clear the Azure session.

# Login page (SSO with Azure)

The login page should:
- Display a "Login with Microsoft" button.
- Initiate the SSO authentication flow with Microsoft Azure when clicked.
- After successful authentication, retrieve the user's partner IDs and roles from Azure claims or group membership.
- Display error messages for failed authentication or missing required claims.
- Redirect to the search page upon successful login.

**Note:**  
- Username, partner IDs, and roles are no longer entered manually.  
- All user information is retrieved from Azure after authentication.

# Search page

The search page should have:
- A search box.
    - Supports type-ahead functionality to display possible results as the user types.
    - A minimum of three characters is required to trigger type-ahead suggestions.
- A button to submit the search.

The user needs to be able to search for the following:
- Mac address
- Pod/extender serial number
- Account ID

The search functionality should include:
- Type-ahead search to display possible results as the user types.
- Search results are limited based on the following:
    - **Partner IDs**: A search should only return possible results for one of the partner ids from the user's Azure claims.
    - **Roles**: For example, testers have elevated access to all test accounts, but not production accounts.

After the user selects a location (based on the device), the application should display:
- A topology map of the device and all interconnected devices.

# Topology map


# Implementation Notes

- Use Microsoft Azure SSO modules for authentication and authorization.
- After login, retrieve user claims (partner IDs, roles, username) from Azure.
- Search results can be mocked with a static dataset for now.
- The topology map can be a placeholder for now, with a simple diagram or static image representing the device and its connections.
- Ensure the UI is responsive and user-friendly, with clear error messages for invalid inputs.

