
import express from 'express';
import { Customer } from '../models/customerModel.js'; // import Customer model
import { MobilePhone } from "../models/mobileModel.js";  //import MobilePhone model
import { Order } from "../models/orderModel.js";  //import Order model

const router = express.Router();

// Route to CREATE a new Order ---- CREATE
router.post('/', async (request, response) => {
    try {
        const { customer, items, totalPrice } = request.body;   //include totalPrice optional incase theres a discount you want to hardcode

        // Check if all required fields are provided
        if (!customer || !items) {
            return response.status(400).send({
                message: 'Send all required fields: customer, items',
            });
        }

        // Check if each item contains mobilePhone ID and quantity
        if (items.some(item => !item.mobilePhone || !item.quantity)) {
            return response.status(400).send({
                message: 'Each item should contain mobilePhone ID and quantity',
            });
        }

        // Check if customer exists
        const existingCustomer = await Customer.findById(customer);
        if (!existingCustomer) {
            return response.status(400).send({
                message: 'Customer not found',
            });
        }

        // Check if mobilePhone IDs exist
        const mobilePhoneIds = items.map(item => item.mobilePhone);
        const existingMobilePhones = await MobilePhone.find({ _id: { $in: mobilePhoneIds } });
        if (existingMobilePhones.length !== mobilePhoneIds.length) {
            return response.status(400).send({
                message: 'One or more mobilePhone IDs not found',
            });
        }

        // Calculate total price if not provided
        let calculatedTotalPrice = totalPrice;
        if (!calculatedTotalPrice) {
            calculatedTotalPrice = items.reduce((acc, item) => {
                const mobilePhone = existingMobilePhones.find(phone => phone._id.toString() === item.mobilePhone);
                return acc + (mobilePhone ? mobilePhone.price * item.quantity : 0);
            }, 0);
        }

        // Set order date to current date if not provided
        const orderDate = request.body.orderDate ? new Date(request.body.orderDate) : new Date();

        // Create the order
        const newOrder = await Order.create({
            customer,
            items,
            totalPrice: calculatedTotalPrice,
            orderDate
        });

        response.status(201).send({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get all Orders from database --RETRIEVE
router.get('/', async (request, response) => {
    try {
        const orders = await Order.find({});

        return response.status(200).json({
            count: orders.length,
            data: orders
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get one random order from database --RETRIEVE
router.get('/random', async (request, response) => {
    try {
        // Retrieve all orders from the database
        const allOrders = await Order.find();

        // If no orders are found, return a 404 status with a message indicating that no orders were found
        if (!allOrders || allOrders.length === 0) {
            return response.status(404).json({ message: "No orders found" });
        }

        // Generate a random index to select a random order from the array
        const randomIndex = Math.floor(Math.random() * allOrders.length);

        // Retrieve the random order using the random index
        const randomOrder = allOrders[randomIndex];

        // Return the random order with a status of 200
        return response.status(200).json(randomOrder);
    } catch (error) {
        console.log(error.message); // If error return a 500 status with an error message
        response.status(500).send({ message: error.message });
    }
});


// Route to get an individuals Orders from database --RETRIEVE
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const order = await Order.findById(id);

        return response.status(200).json(order);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to update an order by ID --UPDATE
router.put('/:id', async (request, response) => {
    try {
        // Check if all required fields are present in the request body
        if (
            !request.body.customer ||
            request.body.items.length === 0      // Check if items array is empty
        ) {
            // If any required field is missing or items is not an array or empty
            return response.status(400).send({
                message: 'Send all required fields: customer, items',
            });
        }

        // Extract the order ID from the request parameters
        const { id } = request.params;

        // Find the order by ID and update it with the request body
        const result = await Order.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Order not found' });
        }

        return response.status(200).send({
            message: 'Order updated successfully',   // success message and the updated order object
            updatedOrder: result
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


// Route to Delete an order by ID - DELETE
router.delete('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const result = await Order.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Order not found' });
        }

        return response.status(200).send({
            message: `Order deleted successfully`,
            deleted: result
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;