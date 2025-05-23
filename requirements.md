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

The application will be a single-page application (SPA) written in JavaScript, using Vue.js.

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

The overall look and feel of the application uses a color scheme inspired by the Xfinity WiFi Is Booming commercials (vivid magenta, purple, blue gradients, and white text).  
Bootstrap utility classes may be used for layout and spacing enhancements.

There is a small header with the name of the application ("AI NOC"), and a footer with the version number.  
- The header is fixed to the top of the page, and the footer is fixed to the bottom.
- The header and footer are compact (header: 25px, footer: 15px tall) and do not obstruct the main content.
- Clicking "AI NOC" in the header always returns the user to the home/search page.

Below the header, there is a main content area that displays either the login page or the search page, depending on authentication state.

**Header details:**
- When logged in, the header displays the user's email.
- Clicking the email shows a dropdown with the user's partner IDs and roles (read-only).
- There is a logout button in the header that logs the user out and returns to the login page.

# Login page (SSO with Azure)

The login page:
- Displays a "Login with Microsoft" button.
- Initiates the SSO authentication flow with Microsoft Azure when clicked.
- After successful authentication, retrieves the user's partner IDs and roles from Azure claims or group membership.
- Displays error messages for failed authentication or missing required claims.
- Redirects to the search page upon successful login.

**Local development SSO mock:**
- When running on `localhost`, clicking "Login with Microsoft" prompts for a username and password.
- On submit, the app assumes a successful login and uses mock partner IDs and roles for the session.

**Note:**  
- Username, partner IDs, and roles are not entered manually except in local mock mode.
- All user information is retrieved from Azure after authentication in production.

# Search page

The search page includes:
- A search box with type-ahead functionality (shows "Searching for ..." while searching).
    - A minimum of three characters is required to trigger type-ahead suggestions.
- A button to submit the search.
- Search results are limited based on:
    - **Partner IDs**: Only results for one of the partner IDs from the user's Azure claims are shown.
    - **Roles**: For example, testers have elevated access to all test accounts, but not production accounts.
- The search supports:
    - Mac address
    - Pod/extender serial number
    - Account ID

# Topology map

- After the user selects a location (based on the device), the application should display a topology map of the device and all interconnected devices.
- The topology map can be a placeholder for now, with a simple diagram or static image representing the device and its connections.

# Implementation Notes

- Use Microsoft Azure SSO modules for authentication and authorization.
- After login, retrieve user claims (partner IDs, roles, username) from Azure.
- Search results can be mocked with a static dataset for now.
- The UI is responsive and user-friendly, with clear error messages for invalid inputs.
- Bootstrap utility classes may be used for layout and spacing.
- The application is structured as a Vue SPA with all navigation and state handled client-side.

