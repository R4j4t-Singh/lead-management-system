Credentials

User Login : {
    email : user6@example.com ,
    password : user
}

User Login : {
    email : user3@example.com
    password : user
}

# Project Overview:

It is a platform where users can manage various tasks, including adding and tracking leads, organizing restaurant information, monitoring performance, and maintaining account details. Here's an overview of its key features and functionalities:

Lead Management:
Users can create and manage leads, assign them to team members, set reminders for follow-ups, and track order details. There is a focus on managing the products associated with leads, including their quantities and pricing.

Restaurant Management:
The system allows users to add and maintain restaurant details, including contact information. It enables a structured approach to managing restaurant-related data.

Performance Tracking:
The platform includes performance analytics, highlighting top and bottom performers based on various metrics, such as order value and count. This feature helps users identify trends and optimize operations.

User Accounts:
Account management functionality includes user login and logout, viewing account details, and administrative tasks like changing key account managers. This ensures smooth user operations and system accessibility.

## System Requirements:

OS : Windows/Linux <br>
NodeJS >= v18.0.0 <br>
Live server or any other web server to run frontend <br>
Mysql server >= 8 <br>

## Instructions to run project on localhost:

1. Unzip source code
2. Run Mysql server
3. Import sample_data.sql to mysql
4. cd to backend
5. Change database credential in db_connection.js file
6. Run `npm i`
7. Run `node app.js`
8. Run frontend using live server or any other server

## Api Documentaion

### Authentication

    Login
    POST /login :Authenticates the user and returns a session ID.
    Request Body:
        {
        "email": "user@example.com",
        "password": "securepassword"
        }
    Response:
        Success:
            {
            "success": true,
            "sessionID": "uniqueSessionId"
            }
        Failure:
            {
            "success": false
            }

### Accounts

    Get Current User
    GET /get-user : Fetches details of the logged-in user.

    Get All Users
    GET /get-users : Retrieves a list of all users.

    Change Admin
    POST /change-admin : Updates the admin for a specific account.
        Request Body:
        {
        "accountID": "12345"
        }

### Calls

    Get Calls by Lead
    GET /get-calls/:leadID : Retrieves all calls associated with a specific lead.

    Get Call Details
    GET /get-call/:callID : Fetches details of a specific call.

    Add Call
    POST /add-call : Creates a new call record.
        Request Body:
        {
        "contactID": "123",
        "duration": 30,
        "leadID": "456"
        }

### Contacts

    Get Contacts by Restaurant
    GET /get-contacts/:restaurantID : Retrieves all contacts for a specific restaurant.

    Get Contact Details
    GET /get-contact/:id : Fetches details of a specific contact.

    Add Contact
    POST /add-contact : Creates a new contact.
    Request Body:
        {
        "name": "Contact Name",
        "email": "contact@example.com",
        "mobileNo": "1234567890",
        "restaurantID": "789",
        "role": "Manager"
        }

### Leads

    Get Leads
    GET /get-leads : Retrieves all leads for the logged-in user.

    Get Lead Details
    GET /get-lead/:id : Fetches details of a specific lead.

    Add Lead
    POST /add-lead : Creates a new lead.
    Request Body:
        {
        "title": "Lead Title",
        "call_frequency": 3,
        "assignedTo": "User ID",
        "restaurantID": "123",
        "total_value": 5000,
        "products": [
            {
            "productID": "1",
            "quantity": 2
            }
        ]
        }

    Remove Lead
    GET /remove-lead/:id : Deletes a specific lead.

    Set Lead Status
    POST /set-status : Updates the status of a lead.
    Request Body:
        {
        "leadID": "123",
        "status": "In Progress"
        }

### Orders

    Get Orders by Lead
    GET /get-orders/:leadID : Retrieves all orders associated with a specific lead.

### Performance

    Top Performer by Orders
    GET /top-performer-by-orders : Fetches the top-performing restaurant based on orders.

    Top Products by Orders
    GET /top-products-by-orders : Retrieves the most popular products based on orders.

    Bottom Performer by Orders
    GET /bottom-performer-by-orders : Fetches the least-performing restaurant based on orders.

### Products

    Get All Products
    GET /get-products : Retrieves a list of all products.

    Get Product Details
    GET /get-product/:productID : Fetches details of a specific product.

### Restaurants

    Get All Restaurants
    GET /get-restaurants : Retrieves a list of all restaurants.

    Get Restaurant Details
    GET /get-restaurant/:id : Fetches details of a specific restaurant.

    Add Restaurant
    POST /add-restaurant : Creates a new restaurant.
    Request Body:
        {
        "name": "Restaurant Name",
        "location": "Location",
        "contacts": [
            {
            "name": "Contact Name",
            "email": "contact@example.com",
            "phone": "1234567890",
            "role": "Manager"
            }
            ]
        }
