# **Mobile Shop Customer Management Application**

## **Overview**
This is a web-based application for an online mobile phone store maintaining a database of customers, mobiles and orders. This project provides CRUD functionality for Creating, Retrieving (Searching), Updating, and Deleting Customer, Mobile and Order information from a MongoDB database.

This project was made as part of my module, **Web Information Processing** in Maynooth University, National University of Ireland Maynooth.

## Technologies Used

### Frontend
- HTML
- CSS (Bootstrap, Bootsnipp)
- JavaScript (jQuery, AJAX)

### Backend
- Express.js
- Node.js
- MongoDB Atlas
- CORS
- Postman

### Browser
- Google Chrome Version 126.0.6478.128 (Official Build) (64-bit)

### Operating System
- Windows

## Project Setup

### Backend Setup

1. **Install Node.js:**
   - [Download Node.js](https://nodejs.org/en/download)
   - Initialize npm: `cd backend` then `npm init -y`

2. **Install Dependencies:**
   - Express for the server: `npm i express`
   - Nodemon for automatic server restarts: `npm i nodemon`
   - Mongoose for MongoDB connection: `npm i mongoose`
   - Dotenv for environment variables: `npm i dotenv`
   - CORS for cross-origin requests: `npm i cors`

3. **Run the Backend:**
   - Start the server: `cd backend` then `npm run dev`
   - Expected output:
     ```
     [nodemon] 3.1.0
     [nodemon] to restart at any time, enter `rs`
     [nodemon] watching path(s): *.*
     [nodemon] watching extensions: js,mjs,cjs,json
     [nodemon] starting `node index.js`
     App connected to the database!
     App is listening to port: 5555
     ```

### Frontend Setup

1. **Create Frontend:**
   - Organize your project structure with a root directory (e.g., `assignment-05` or `mobile-shop`) containing folders for `frontend` and `backend`.

2. **Setup Frontend Environment:**
   - Navigate to the frontend directory: `cd frontend`
   - Create the required HTML, CSS, and JavaScript files:
     - `assignment-05.html` or `index.html`
     - `assignment-05.style` or `styles.css`
     - `assignment-05-customerCRUD.js` or `scripts.js`

3. **Include Libraries and Frameworks:**
   - Use CDN links for Bootstrap, jQuery, and Bootsnipp components. Add Bootstrap and CSS in the `<head>` section of your HTML file:
     ```html
     <!-- Bootstrap CSS -->
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
     
     <!-- Custom CSS -->
     <link rel="stylesheet" href="assignment-05.css">
     ```
    -Add jQuery and JS after the `</body>` section of your HTML file:

     ```
     </body>
      <!-- JQuery import -->
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
      
      <!-- Javascript files -->
      <script src="assignment-05-customerCRUD.js"></script>
      <script src="assignment-05-mobileCRUD.js"></script>
      <script src="assignment-05-orderCRUD.js"></script>
      
      </html>
     ```

4. **Run the Frontend:**
   - Right click `assignment-05.html`, then click 'Show in browser', to access the web application.

## DATABASE DESIGN

This project uses a NoSQL database design with MongoDB, focusing on collections for two main entities: `customer` and `mobilePhone`. These collections store documents that represent individual customer records and mobile phone models, respectively. A third collection, `order`, defines the relationship between customers and mobile phones, acting as a bridge to capture the mobile phones purchased by each customer.

### Data Modeling Approach

- **Entities and Collections**:
  - `customer`: Contains customer details like name, contact information, home, and shipping addresses.
  - `mobilePhone`: Contains details about mobile phone models, including manufacturer, model name, and price.
  
- **Relationship (orders)**:
  - The `order` collection links `customer` to the `mobilePhone` they've purchased. Each order document references a customer and lists one or more mobile phones, along with the quantity and total price.

  - **Customer Schema:**
  - `title`: String (e.g. Mr, Ms, etc.)
  - `firstName`: String
  - `surname`: String
  - `mobile`: String
  - `emailAddress`: String (unique)
  - `homeAddress`: Object with fields `addressLine1`, `addressLine2`, `town`, `county`, and `EIRCODE`
  - `shippingAddress`: Object with fields `addressLine1`, `addressLine2`, `town`, `county`, and `EIRCODE`

- **MobilePhone Schema:**
  - `manufacturer`: String
  - `model`: String
  - `price`: Number

- **Order Schema:**
  - `customer`: ObjectId (reference to `Customer`)
  - `items`: Array of objects with `mobilePhone` (ObjectId, reference to `MobilePhone`) and `quantity` (Number)
  - `totalPrice`: Number
  - `orderDate`: Date

### Cascading Deletes

- To maintain data integrity, middleware is used to handle cascading deletes:
  - When a customer is deleted, all associated orders in the `order` collection are automatically removed.
  - When a mobile phone model is deleted, any references to it in orders are also removed.

### Impact on Code Development

- **Pre-remove Middleware**: The use of pre-remove middleware in both the `customer` and `mobilePhone` schemas simplifies the process of maintaining referential integrity by automatically handling related data deletions.
- **Flexible Data Structure**: MongoDB’s flexible document-based schema allows for future scalability, such as adding new fields to the customer or mobile phone documents without requiring significant schema modifications.

## Running the Project

1. **Backend:**
   - `cd backend`
   - `npm run dev`

2. **Frontend:**
   - Open `assignment-05.html` in your web browser.

## Testing Backend Routes in Postman

### Customer Endpoints

1. **Create a new customer (POST):**
   - **URL:** `http://localhost:5555/customer`
   - **Method:** POST
   - **Body (raw JSON):**
     ```json
     {
       "title": "Mr",
       "firstName": "John",
       "surname": "Doe",
       "mobile": "1234567890",
       "emailAddress": "john.doe@example.com",
       "homeAddress": {
         "addressLine1": "123 Elm Street",
         "addressLine2": "",
         "town": "Springfield",
         "county": "IL",
         "EIRCODE": "12345"
       },
       "shippingAddress": {
         "addressLine1": "456 Oak Avenue",
         "addressLine2": "",
         "town": "Springfield",
         "county": "IL",
         "EIRCODE": "67890"
       }
     }
     ```

2. **Retrieve all customers (GET):**
   - **URL:** `http://localhost:5555/customer`
   - **Method:** GET

3. **Retrieve a customer by ID (GET):**
   - **URL:** `http://localhost:5555/customer/665a1bca21a094af001a007a`
   - **Method:** GET

4. **Update a customer by ID (PUT):**
   - **URL:** `http://localhost:5555/customer/666199665d4e013c11a2e1d5`
   - **Method:** PUT
   - **Body (raw JSON):**
     ```json
     {
       "title": "Mrs",
       "firstName": "Jane",
       "surname": "Doe",
       "mobile": "0987654321",
       "emailAddress": "jane.doe@example.com",
       "homeAddress": {
         "addressLine1": "789 Maple Road",
         "addressLine2": "",
         "town": "Springfield",
         "county": "IL",
         "EIRCODE": "54321"
       },
       "shippingAddress": {
         "addressLine1": "101 Pine Street",
         "addressLine2": "",
         "town": "Springfield",
         "county": "IL",
         "EIRCODE": "98765"
       }
     }
     ```

5. **Delete a customer by ID (DELETE):**
   - **URL:** `http://localhost:5555/customer/661bed15bd766897c0746b9e`
   - **Method:** DELETE

### MobilePhone Endpoints

1. **Create a new MobilePhone (POST):**
   - **URL:** `http://localhost:5555/mobilePhone`
   - **Method:** POST
   - **Body (raw JSON):**
     ```json
     {
       "manufacturer": "NEW Nokia",
       "model": "Nokia T-1000",
       "price": 69.99
     }
     ```

2. **Retrieve all MobilePhones (GET):**
   - **URL:** `http://localhost:5555/mobilePhone`
   - **Method:** GET

3. **Retrieve a MobilePhone by ID (GET):**
   - **URL:** `http://localhost:5555/mobilePhone/661f8c3e2627f0969359aac2`
   - **Method:** GET

4. **Retrieve Random MobilePhone (GET):**
   - **URL:** `http://localhost:5555/mobilePhone/random`
   - **Method:** GET

5. **Retrieve MobilePhone by Composite Key (GET):**
   - **URL:** `http://localhost:5555/mobilePhone/matchingMobiles?manufacturer=Nokia&model=Nokia%20T-30`
   - **Method:** GET

6. **Update a MobilePhone (PUT):**
   - **URL:** `http://localhost:5555/mobilePhone/6624e7e01817994b139dc81a`
   - **Method:** PUT
   - **Body (raw JSON):**
     ```json
     {
       "manufacturer": "Apple",
       "model": "iPhone T-51",
       "price": 205.99
     }
     ```

7. **Delete a MobilePhone by Composite Key (DELETE):**
   - **URL:** `http://localhost:5555/mobilePhone`
   - **Method:** DELETE
   - **Body (raw JSON):**
     ```json
     {
       "manufacturer": "Apple",
       "model": "iPhone X7",
       "price": 75.99
     }
     ```

### Order Endpoints

1. **Create a new Order (POST):**
   - **URL:** `http://localhost:5555/order`
   - **Method:** POST
   - **Body (raw JSON):**
     ```json
     {
       "customer": "661edd65f76a7c6212ae7767",
       "items": [
         {
           "mobilePhone": "661f8c3e2627f0969359aac2",
           "quantity": 2
         }
       ],
       "totalPrice": 139.98,
       "orderDate": "2024-08-30T10:00:00Z"
     }
     ```

2. **Retrieve all Orders (GET):**
   - **URL:** `http://localhost:5555/order`
   - **Method:** GET

3. **Retrieve an Order by ID (GET):**
   - **URL:** `http://localhost:5555/order/665a1bca21a094af001a007a`
   - **Method:** GET

4. **Update an Order by ID (PUT):**
   - **URL:** `http://localhost:5555/order/666199665d4e013c11a2e1d5`
   - **Method:** PUT
   - **Body (raw JSON):**
     ```json
     {
       "items": [
         {
           "mobilePhone": "661f8c3e2627f0969359aac2",
           "quantity": 3
         }
       ],
       "totalPrice": 209.97
     }
     ```

5. **Delete an Order by ID (DELETE):**
   - **URL:** `http://localhost:5555/order/661bed15bd766897c0746b9e`
   - **Method:** DELETE


# API Command Guide

## To run commands from terminal (use curl/Powershell's Invoke-WebRequest)
1. **Ensure the server is running** (Refer to "TO RUN THE PROJECT IN TERMINAL" above).
2. **Open a second terminal in VSCode**. `cd backend`

## MobilePhone Commands

### 1. Create a New MobilePhone
**PowerShell:**
```powershell
Invoke-WebRequest -Uri 'http://localhost:5555/mobilePhone' -Method POST -Headers @{'Content-Type'='application/json'} -Body '{
    "manufacturer": "NEW Nokia",
    "model": "Nokia T-1000",
    "price": 69.99
}'
```
### 2. To RETIREVE ALL  MOBILEPHONES and have formated like JSON:
```
curl http://localhost:5555/mobilePhone | ConvertFrom-Json | ForEach-Object {
    Write-Host "Count: $($_.count)"
    Write-Host "------------------------"
    $_.data | ForEach-Object {
        Write-Host "ID: $($_._id)"
        Write-Host "Manufacturer: $($_.manufacturer)"
        Write-Host "Model: $($_.model)"
        Write-Host "Price: $($_.price)"
        Write-Host "CreatedAt: $($_.createdAt)"
        Write-Host "UpdatedAt: $($_.updatedAt)"
        Write-Host "__v: $($_.__v)"
        Write-Host "------------------------"
    }
}
```
### 3. To RETRIEVE MOBILEPHONE by ID:
```
curl http://localhost:5555/mobilePhone/661f8c3e2627f0969359aac2         ##Replace with id of what you want
```

### 4. To RETRIEVE Random MOBILEPHONE:
```
curl 'http://localhost:5555/mobilePhone/random'
```

### 5. To RETRIEVE a MOBILE by COMPOSITE KEY (Manufacturer, Model)
```
Invoke-WebRequest -Uri 'http://localhost:5555/mobilePhone/matchingMobiles?manufacturer=Nokia&model=Nokia%20T-30'
```

### 6. To UPDATE a MOBILEPHONE:
```
Invoke-WebRequest -Uri 'http://localhost:5555/mobilePhone/6624e7e01817994b139dc81a' -Method PUT -Headers @{'Content-Type'='application/json'} -Body '{
    "manufacturer": "Apple",
    "model": "iPhone T-51",
    "price": 205.99
}'
```

-------TO SHOW BEFORE AND AFTER WHEN UPDATING SELECT ALL BELOW AND PASTE INTO TERMINAL AND RUN------------------
```
$response = Invoke-WebRequest -Uri 'http://localhost:5555/mobilePhone/6624e7e01817994b139dc81a' -Method PUT -Headers @{'Content-Type'='application/json'} -Body '{
    "manufacturer": "Apple",
    "model": "iPhone T-51",
    "price": 205.99
}'
```


### 7. To DELETE a MOBILEPHONE by Composite Key (manufacturer, model, price):
```
Invoke-WebRequest -Uri 'http://localhost:5555/mobilePhone' -Method DELETE -Headers @{'Content-Type'='application/json'} -Body '{
    "manufacturer": "Apple",
    "model": "iPhone X7",
    "price": 75.99
}'
```

<!-- ### Convert the content to a PowerShell object
$contentObject = $response.Content | ConvertFrom-Json

### Display the content object
$contentObject | Format-List  -->

## CUSTOMER COMMANDS:

### 1. To CREATE a new CUSTOMER - Uses PowerShell's Invoke-WebRequest
```
Invoke-WebRequest -Uri 'http://localhost:5555/customer' -Method POST -Headers @{'Content-Type'='application/json'} -Body '{
    "title": "Mr",
    "firstName": "Clancy",
    "surname": "Wiggum",
    "mobile": "087645603567",
    "emailAddress": "clancy.wiggum@gmail.com",
    "homeAddress": {
        "addressLine1": "740 Evergreen Terrace",
        "addressLine2": "",
        "town": "Springfield",
        "county": "BigCounty",
        "EIRCODE": ""
    },
    "shippingAddress": {
        "addressLine1": "8 Red Road",
        "addressLine2": "",
        "town": "Shelbyville",
        "county": "BigCounty",
        "EIRCODE": ""
    }
}'
```

### 2. RETRIEVE All CUSTOMERS and have formated like JSON
```
Invoke-WebRequest -Uri 'http://localhost:5555/customer' | ConvertFrom-Json | ForEach-Object {
    Write-Host "Count: $($_.count)"
    Write-Host "------------------------"
    $_.data | ForEach-Object {
        Write-Host "ID: $($_._id)"
        Write-Host "Title: $($_.title)"
        Write-Host "First Name: $($_.firstName)"
        Write-Host "Surname: $($_.surname)"
        Write-Host "Mobile: $($_.mobile)"
        Write-Host "Email Address: $($_.emailAddress)"
        Write-Host "Home Address:"
        Write-Host "   Address Line 1: $($_.homeAddress.addressLine1)"
        Write-Host "   Address Line 2: $($_.homeAddress.addressLine2)"
        Write-Host "   Town: $($_.homeAddress.town)"
        Write-Host "   County: $($_.homeAddress.county)"
        Write-Host "   EIRCODE: $($_.homeAddress.EIRCODE)"
        Write-Host "Shipping Address:"
        Write-Host "   Address Line 1: $($_.shippingAddress.addressLine1)"
        Write-Host "   Address Line 2: $($_.shippingAddress.addressLine2)"
        Write-Host "   Town: $($_.shippingAddress.town)"
        Write-Host "   County: $($_.shippingAddress.county)"
        Write-Host "   EIRCODE: $($_.shippingAddress.EIRCODE)"
        Write-Host "Created At: $($_.createdAt)"
        Write-Host "Updated At: $($_.updatedAt)"
        Write-Host "__v: $($_.__v)"
        Write-Host "------------------------"
    }
}
```
### 3. To RETRIEVE CUSTOMER by ID:
```
-   curl http://localhost:5555/customer/661edd65f76a7c6212ae7767        ##Replace with id of what you want
```
-   to see the customers info use:
```
Invoke-WebRequest -Uri 'http://localhost:5555/customer/661edd65f76a7c6212ae7767' | ConvertFrom-Json | ForEach-Object {
    Write-Host "ID: $($_._id)"
    Write-Host "Title: $($_.title)"
    Write-Host "First Name: $($_.firstName)"
    Write-Host "Surname: $($_.surname)"
    Write-Host "Mobile: $($_.mobile)"
    Write-Host "Email Address: $($_.emailAddress)"
    Write-Host "Home Address:"
    Write-Host "   Address Line 1: $($_.homeAddress.addressLine1)"
    Write-Host "   Address Line 2: $($_.homeAddress.addressLine2)"
    Write-Host "   Town: $($_.homeAddress.town)"
    Write-Host "   County: $($_.homeAddress.county)"
    Write-Host "   EIRCODE: $($_.homeAddress.EIRCODE)"
    Write-Host "Shipping Address:"
    Write-Host "   Address Line 1: $($_.shippingAddress.addressLine1)"
    Write-Host "   Address Line 2: $($_.shippingAddress.addressLine2)"
    Write-Host "   Town: $($_.shippingAddress.town)"
    Write-Host "   County: $($_.shippingAddress.county)"
    Write-Host "   EIRCODE: $($_.shippingAddress.EIRCODE)"
    Write-Host "Created At: $($_.createdAt)"
    Write-Host "Updated At: $($_.updatedAt)"
    Write-Host "__v: $($_.__v)"
}
```

### 4. To RETRIEVE Random CUSTOMER:

- curl http://localhost:5555/customer/random       

- To see a random Customers info displayed use:
```
Invoke-WebRequest -Uri 'http://localhost:5555/customer/random' | ConvertFrom-Json | ForEach-Object {
    Write-Host "ID: $($_._id)"
    Write-Host "Title: $($_.title)"
    Write-Host "First Name: $($_.firstName)"
    Write-Host "Surname: $($_.surname)"
    Write-Host "Mobile: $($_.mobile)"
    Write-Host "Email Address: $($_.emailAddress)"
    Write-Host "Home Address:"
    Write-Host "   Address Line 1: $($_.homeAddress.addressLine1)"
    Write-Host "   Address Line 2: $($_.homeAddress.addressLine2)"
    Write-Host "   Town: $($_.homeAddress.town)"
    Write-Host "   County: $($_.homeAddress.county)"
    Write-Host "   EIRCODE: $($_.homeAddress.EIRCODE)"
    Write-Host "Shipping Address:"
    Write-Host "   Address Line 1: $($_.shippingAddress.addressLine1)"
    Write-Host "   Address Line 2: $($_.shippingAddress.addressLine2)"
    Write-Host "   Town: $($_.shippingAddress.town)"
    Write-Host "   County: $($_.shippingAddress.county)"
    Write-Host "   EIRCODE: $($_.shippingAddress.EIRCODE)"
    Write-Host "Created At: $($_.createdAt)"
    Write-Host "Updated At: $($_.updatedAt)"
    Write-Host "__v: $($_.__v)"
}
```
### 5. To RETRIEVE CUSTOMER by COMPOSITE KEY (firstName, surname):
```
Invoke-WebRequest -Uri 'http://localhost:5555/customer/matchingUsers?firstName=Homer&surname=Simpson'
```


### 6. To UPDATE a RANDOM CUSTOMER's title, phone number, emailAddress
```
Invoke-WebRequest -Uri 'http://localhost:5555/customer/random' -Method PUT -Headers @{'Content-Type'='application/json'} -Body '{
    "title": "Mr", 
    "mobile": "08778653567",
    "emailAddress": "randomEmail1@gmail.com"
}'
```
### 7. To DELETE a CUSTOMER by COMPSITE KEY (firstName, surname, mobile, emailAddress):
```
Invoke-WebRequest -Uri 'http://localhost:5555/customer' -Method DELETE -Headers @{'Content-Type'='application/json'} -Body '{
    "firstName": "Clancy",
    "surname": "Wiggum",
    "mobile": "087645603567",
    "emailAddress": "clancy.wiggum@gmail.com"
}'
```

## ORDER COMMANDS:

### 1. To CREATE a new ORDER - Uses PowerShell's Invoke-WebRequest
```
Invoke-WebRequest -Uri 'http://localhost:5555/order' -Method POST -Headers @{'Content-Type'='application/json'} -Body '{
    "customer": "661f80b3bb6ef4d25d59e01e",
    "items": [
        {
            "mobilePhone": "661f8cbf2627f0969359aacc",
            "quantity": 1
        }
    ]
}'
```
### 2. RETRIEVE All ORDERS and have formated like JSON
```
Invoke-WebRequest -Uri 'http://localhost:5555/order' | ConvertFrom-Json | ForEach-Object {
    Write-Host "Count: $($_.count)"
    Write-Host "------------------------"
    $_.data | ForEach-Object {
        Write-Host "ID: $($_._id)"
        Write-Host "Customer: $($_.customer)"
        Write-Host "Total Price: $($_.totalPrice)"
        Write-Host "Order Date: $($_.orderDate)"
        Write-Host "Created At: $($_.createdAt)"
        Write-Host "Updated At: $($_.updatedAt)"
        Write-Host "__v: $($_.__v)"
        Write-Host "Items:"

        # Loop through items
        $_.items | ForEach-Object {
            Write-Host "   Item ID: $($_._id)"
            Write-Host "   Mobile Phone: $($_.mobilePhone)"
            Write-Host "   Quantity: $($_.quantity)"
            Write-Host "   ------------------------"
        }
        
        Write-Host "------------------------"
    }
}
```
### 3. RETRIEVE ORDER by ID and have formated like JSON
```
Invoke-WebRequest -Uri "http://localhost:5555/order/6622df1afc9ae32baf1f1354" | ConvertFrom-Json | ForEach-Object {
    Write-Host "ID: $($_._id)"
    Write-Host "Customer: $($_.customer)"
    Write-Host "Total Price: $($_.totalPrice)"
    Write-Host "Order Date: $($_.orderDate)"
    Write-Host "Created At: $($_.createdAt)"
    Write-Host "Updated At: $($_.updatedAt)"
    Write-Host "__v: $($_.__v)"
    Write-Host "Items:"

    # Loop through items
    $_.items | ForEach-Object {
        Write-Host "   Item ID: $($_._id)"
        Write-Host "   Mobile Phone: $($_.mobilePhone)"
        Write-Host "   Quantity: $($_.quantity)"
        Write-Host "   ------------------------"
    }
}
```

### 4. To RETRIEVE Random ORDER:

- curl http://localhost:5555/order/random       

- To see a random Orders info displayed use:
```
Invoke-WebRequest -Uri 'http://localhost:5555/order/random' | ConvertFrom-Json | ForEach-Object {
    Write-Host "ID: $($_._id)"
    Write-Host "Customer: $($_.customer)"
    Write-Host "Total Price: $($_.totalPrice)"
    Write-Host "Order Date: $($_.orderDate)"
    Write-Host "Created At: $($_.createdAt)"
    Write-Host "Updated At: $($_.updatedAt)"
    Write-Host "__v: $($_.__v)"
    Write-Host "Items:"

    # Loop through items
    $_.items | ForEach-Object {
        Write-Host "   Item ID: $($_._id)"
        Write-Host "   Mobile Phone: $($_.mobilePhone)"
        Write-Host "   Quantity: $($_.quantity)"
        Write-Host "   ------------------------"
    }
}
```
### 5. To UPDATE a ORDER's customer, items.mobilePhone, items.quantity
```
Invoke-WebRequest -Uri 'http://localhost:5555/order/6622efae666ceebe10af66cc' -Method PUT -Headers @{'Content-Type'='application/json'} -Body '{
    "customer": "6622dee8fc9ae32baf1f134b",
    "items": [
        {
            "mobilePhone": "661f8cb02627f0969359aaca",
            "quantity": 3
        }
    ]
}'
```

### 6. To DELETE a Order by ID:
```
Invoke-WebRequest -Uri 'http://localhost:5555/order/66255071aa7fc0dbcd63befc' -Method DELETE
```



## Frontend

## Overview

The frontend of this project is designed as a single HTML page that includes forms and interactive elements. The page provides CRUD functionality for Creating, Retrieving (Searching), Updating, and Deleting Customer, Mobile and Order information.

Customers, Mobiles and Orders each have:
1. **Create Form** - A form for adding new customers, mobiles or orders. Red asterix indicates a maditory field.
2. **Retrieve Form** - A search bar with an in page console view displaying the results in JSON format.  Can retrieve a customer, mobile or order randomly, by searching it's name or retrieve all the results.
3. **Update Form** - A form for updating a random customer, mobile or order information.
4. **Delete Form** - A deletion form based on composite key depending on the entity and a confirmation box to confirm deletion.


**JavaScript (AJAX and jQuery)**
   - Handles CRUD operations by sending AJAX requests to the backend and updating the frontend dynamically based on the responses.

## References

### Tutorials
- [Simple CRUD Application with jQuery, AJAX, and Express.js](https://www.youtube.com/watch?v=ldgl6z8dQtY)

### Documentation
- [W3Schools jQuery Tutorial](https://www.w3schools.com/jquery/default.asp)

### Tools and Services
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Postman](https://www.postman.com/)

