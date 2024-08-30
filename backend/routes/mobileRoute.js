import express from 'express';
import { MobilePhone } from '../models/mobileModel.js';

const router = express.Router();

// Route to create a new mobilePhone -- CREATE
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.manufacturer ||
            !request.body.model ||
            !request.body.price
        ) {
            return response.status(400).send({
                message: 'Send all required fields: manufacturer, model, price',
            });
        }

        const newMobilePhone = {
            manufacturer: request.body.manufacturer,
            model: request.body.model,
            price: request.body.price,
        };

        const mobilePhone = await MobilePhone.create(newMobilePhone);

        return response.status(201).send(mobilePhone);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


// Route to get all mobilePhones -- RETRIEVE
router.get('/', async (request, response) => {
    try {
        const mobilePhones = await MobilePhone.find({});

        return response.status(200).json({
            count: mobilePhones.length,
            data: mobilePhones
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


// Route to Get one random mobilePhone from database ------ RETRIEVE RANDOM
router.get('/random', async (request, response) => {
    try {
        // Retrieve all mobilePhones from the database
        const allMobiles = await MobilePhone.find();

        // If no mobilePhones are found, return a 404 status with a message indicating that no mobilePhones were found
        if (!allMobiles || allMobiles.length === 0) {
            return response.status(404).json({ message: "No customers found" });
        }

        // Generate a random index to select a random mobilePhone from the array
        const randomIndex = Math.floor(Math.random() * allMobiles.length);

        // Retrieve the random mobilePhone using the random index
        const randomMobile = allMobiles[randomIndex];

        // Return the random mobilePhone with a status of 200
        return response.status(200).json(randomMobile);
    } catch (error) {
        console.log(error.message);         // If error return a 500 status with an error message
        response.status(500).send({ message: error.message });
    }
});


// Route to retrieve matching mobile phones based on manufacturer and model
router.get('/matchingMobiles', async (request, response) => {
    try {
        const { manufacturer, model } = request.query;

        // search for mobile phones with matching manufacturer and model
        const matchingMobiles = await MobilePhone.find({
            manufacturer,
            model
        });

        return response.status(200).json(matchingMobiles); // Return the matching mobile phones to the frontend
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


// Route to get mobilePhone by ID -- RETRIEVE
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const mobilePhone = await MobilePhone.findById(id);

        return response.status(200).json(mobilePhone);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


// Route to update mobilePhone by ID -- UPDATE
router.put('/:id', async (request, response) => {
    try {
        // Check if all required fields are present in the request body
        if (
            !request.body.manufacturer ||
            !request.body.model ||
            !request.body.price
        ) {         // If any required field is missing
            return response.status(400).send({
                message: 'Send all required fields: manufacturer, model, price',
            });
        }

        // Extract the mobilePhone ID from the request parameters
        const { id } = request.params;

        // Find the old mobile phone by ID
        const oldMobilePhone = await MobilePhone.findById(id);

        // If the old mobile phone is not found, return a 404 error
        if (!oldMobilePhone) {
            return response.status(404).json({ message: 'MobilePhone not found' });
        }

        // Update the mobile phone by ID with the request body
        const updatedMobilePhone = await MobilePhone.findByIdAndUpdate(id, request.body, { new: true });

        // Return the success message along with the old and updated mobile phone objects
        return response.status(200).send({
            message: 'MobilePhone updated successfully',
            oldMobilePhone: oldMobilePhone,
            updatedMobilePhone: updatedMobilePhone
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


// Route to Delete a MobilePhone - DELETE
router.delete('/', async (request, response) => {
    try {
        const { manufacturer, model, price } = request.body;      // Composite key: a key made up of multiple fields

        // Check if all necessary fields are provided
        if (!manufacturer || !model || !price) {
            return response.status(400).json({ message: 'Please provide manufacturer, model and price to delete a mobilePhone' });
        }

        const result = await MobilePhone.findOneAndDelete({ manufacturer, model, price });

        if (!result) {
            return response.status(404).json({ message: 'MobilePhone not found' });
        }

        return response.status(200).send({
            message: `MobilePhone deleted successfully`,
            deleted: result
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


export default router;