# AI NOC

This goal of this application is to generate almost all the actual code with AI.

The goal is to begin to develop a replacement for an existing application, 
but it is fraught with security challenges and doesn't provide the level
of partner isolation that is required.

The user of the application can either be logged in or not. If the user is not logged in,
then display a login page (eventually to be replaced by an SSO solution).

If the user is not logged in, then show the login screen described below.
Once the user is successfully logged in, then display a search page.

There is no server-side component in this implementation. The application will (eventually) communicate with
other services via REST APIs, but for now, the application will be a single-page application written in JavaScript.

The application will be a single-page application (SPA) written in JavaScript, using a modern framework like React or Vue.js.

The application should be responsive and work on both desktop and mobile devices.

The application should be designed with the following principles in mind:
- **Security**: The application should be designed with security in mind, including input validation, authentication, and authorization.
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

There should also be a dropdown menu in the header that allows the user to select their partner ID and role. This dropdown should be populated with the partner IDs and roles from the login page. The selected partner ID and role should be displayed in the header, along with the username of the logged-in user.

Once the user is logged in, there should be a logout button in the header that allows the user to log out. When the user logs out, the application should redirect to the login page.

# Login page

The login page should have the following fields:
- **Username**
    - Required field.
    - Must be alphanumeric and between 3–20 characters.
    - Indicate on the UI that this is a required field
    
- **PartnerIds**
    - This should be a list of partner ids from the inventory database. 
    - Examples:
        - partner1
        - partner2
        - partner3
        - partner4
    - Required field.
    - Implement as a dropdown or multi-select box.

- **Roles**
    - support - basic read access to all areas
    - admin - read/write access to all areas
    - super admin - read/write access to all areas and the ability to add new users
    - tester - read/write to all areas based on the device selected
    - Required field.
    - Only allow one role to be selected at a time
    - Implement as a dropdown or single-select box.
    - The default value should be "support" for the initial implementation.

These can be hardcoded pick lists for now. Eventually, we will plan to replace it
with a call to an SSO authority which will provide the partner(s) and roles assigned to the user. 
During the initial implementation, this can be a simple hardcoded list of users and their roles.

The login page should also have:
- A button to "login."
- Basic validation for required fields (e.g., username, partner id, and role must be selected).
- Display error messages for invalid inputs (e.g., "Username is required," "Invalid partner ID").

When the login button is clicked, the application should:
1. Validate the input fields.
2. Log that the user has been successfully logged in.
3. Show the logged-in user on the top right side of the page.
4. Display the search page.


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
    - **Partner IDs**: A search should only return possible results for one of the partner ids from the user login page.
    - **Roles**: For example, testers have elevated access to all test accounts, but not production accounts.

After the user selects a location (based on the device), the application should display:
- A topology map of the device and all interconnected devices.

# Topology map


# Implementation Notes

- Use hardcoded data for the initial implementation:
    - Partner IDs, roles, and users can be stored in a simple JSON or JavaScript object.
    - Example hardcoded user data:
      ```json
      {
        "users": [
          {
            "username": "adminUser",
            "partnerIds": ["partner1", "partner2"],
            "role": "admin"
          },
          {
            "username": "testUser",
            "partnerIds": ["partner3"],
            "role": "tester"
          }
        ]
      }
      ```
    - Search results can be mocked with a static dataset.
- The topology map can be a placeholder for now, with a simple diagram or static image representing the device and its connections.
- Ensure the UI is responsive and user-friendly, with clear error messages for invalid inputs.
