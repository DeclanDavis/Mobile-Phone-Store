import express from 'express';  //import express
import { Customer } from '../models/customerModel.js'; //import Customer Model
const router = express.Router();

// Route to Create a new Customer ----- CREATE
router.post('/', async (request, response) => {
    try {                                                   // success
       if (
        !request.body.title || !request.body.firstName || !request.body.surname || !request.body.mobile || !request.body.emailAddress ||
        !request.body.homeAddress.addressLine1 || !request.body.homeAddress.town || !request.body.homeAddress.county ||
        !request.body.shippingAddress.addressLine1 || !request.body.shippingAddress.town || !request.body.shippingAddress.county
       ) {
        return response.status(400).send({
            message: "Send all required fields: title, firstName, surname, mobile, emailAddress. Home Address: addressLine1, town, county. Shipping Address: addressLine1, town, county.",
        })
       } 
       const newCustomer = {
        title: request.body.title,
        firstName: request.body.firstName,
        surname: request.body.surname,
        mobile: request.body.mobile,
        emailAddress: request.body.emailAddress,
        homeAddress: {
            addressLine1: request.body.homeAddress.addressLine1,
            addressLine2: request.body.homeAddress.addressLine2,        //Optional, if no input will be undefined
            town: request.body.homeAddress.town,
            county: request.body.homeAddress.county,
            EIRCODE: request.body.homeAddress.EIRCODE                   //Optional, if no input will be undefined
        },
        shippingAddress: {
            addressLine1: request.body.shippingAddress.addressLine1,    
            addressLine2: request.body.shippingAddress.addressLine2,    //Optional, if no input will be undefined
            town: request.body.shippingAddress.town,
            county: request.body.shippingAddress.county,
            EIRCODE: request.body.shippingAddress.EIRCODE               //Optional, if no input will be undefined
        }
    };

    const customer = await Customer.create(newCustomer);                //Create a new customer document(equivalent My SQL row) in database
    
    return response.status(201).send(customer);                         //send the customer to the frontend(client)

    } catch (error) {                                                   // failure
        console.log(error.message);
        response.status(500).send({message: error.message });
    }
});



// Route to Get all customers from database ------ RETRIEVE

router.get('/', async (request, response) => {
    try {
        const customers = await Customer.find({});     //Retireve all the customers and store in const customers

        return response.status(200).json({
            count: customers.length,                 // Sending both the count of customers
            data: customers                          // and their data
    });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to Get one random customer from database ------ RETRIEVE RANDOM
router.get('/random', async (request, response) => {
    try {
        // Retrieve all customers from the database
        const allCustomers = await Customer.find();

        // If no customers are found, return a 404 status with a message indicating that no customers were found
        if (!allCustomers || allCustomers.length === 0) {
            return response.status(404).json({ message: "No customers found" });
        }

        // Generate a random index to select a random customer from the array
        const randomIndex = Math.floor(Math.random() * allCustomers.length);

        // Retrieve the random customer using the random index
        const randomCustomer = allCustomers[randomIndex];

        // Return the random customer with a status of 200
        return response.status(200).json(randomCustomer);
    } catch (error) {
        console.log(error.message);         // If error return a 500 status with an error message
        response.status(500).send({ message: error.message });
    }
});

// Route to retrieve matching users based on first name and surname
router.get('/matchingUsers', async (request, response) => {
    try {
        const { firstName, surname } = request.query;

        // Perform a case-sensitive search for users with matching first name and surname
        const matchingUsers = await Customer.find({
            firstName,
            surname
        });

        return response.status(200).json(matchingUsers); // Return the matching users to the frontend
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


// Route to Get one customer by their id from database ------ RETRIEVE

router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const customer = await Customer.findById(id);     //Retireve the customer by their ID and store in const customer

        return response.status(200).json(customer);     // Return the customer to the frontend(client)

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to Update a random customer ---------- UPDATE

router.put('/random', async (request, response) => {
    try {
        // Retrieve all customers from the database
        const allCustomers = await Customer.find();

        // If no customers are found, return a 404 status with a message indicating that no customers were found
        if (!allCustomers || allCustomers.length === 0) {
            return response.status(404).json({ message: "No customers found" });
        }

        // Generate a random index to select a random customer from the array
        const randomIndex = Math.floor(Math.random() * allCustomers.length);

        // Retrieve the random customer using the random index
        const randomCustomer = allCustomers[randomIndex];

        // Verify request has the required fields
        if (
            !request.body.title ||
            !request.body.emailAddress ||
            !request.body.mobile
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, emailAddress, mobile '
            })
        }

        // Update the random customer with the provided data
        const updateFields = {
            title: request.body.title,
            emailAddress: request.body.emailAddress,
            mobile: request.body.mobile
        };

        // Check and update home address if provided
        if (request.body.homeAddress && Object.keys(request.body.homeAddress).length !== 0) {
            updateFields.homeAddress = { ...randomCustomer.homeAddress, ...request.body.homeAddress };
        }

        // Check and update shipping address if provided
        if (request.body.shippingAddress && Object.keys(request.body.shippingAddress).length !== 0) {
            updateFields.shippingAddress = { ...randomCustomer.shippingAddress, ...request.body.shippingAddress };
        }

        // Update the random customer with the provided data
        const updatedCustomer = await Customer.findByIdAndUpdate(randomCustomer._id, updateFields, { new: true });

        // Check if the customer was successfully updated
        if (!updatedCustomer) {
            return response.status(404).json({ message: 'Customer not found' });
        }

        // Log the updated customer's first name
        console.log("Updating: " + updatedCustomer.firstName);

        // Return the updated customer object in the response
        return response.status(200).json(updatedCustomer);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: 'Internal server error' });
    }
});


/* D (delete) activity, please
delete all records for a customer matching a specified email, phone and name using deleteCustomer(<
details>) */


// Route to delete a customer matching specified request.body - DELETE

router.delete('/', async (request, response) => {
    try {
        const { emailAddress, mobile, firstName, surname } = request.body;      // Composite key: a key made up of multiple fields

        // Check if all necessary fields are provided
        if (!emailAddress || !mobile || !firstName || !surname) {
            return response.status(400).json({ message: 'Please provide emailAddress, mobile, firstName and surname to delete a customer' });
        }

        const result = await Customer.findOneAndDelete({ emailAddress, mobile, firstName, surname });

        if (!result){
            return response.status(404).json({ message: 'Customer not found' });
        }

        return response.status(200).send( {message: `Customer: ${firstName} ${surname} deleted successfully`});
        
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});



export default router;