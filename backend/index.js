import dotenv from 'dotenv';
dotenv.config();// Load environment variables from the .env file

/* 
To check connection String and PORT are correct
console.log("PORT:", process.env.PORT); 
console.log("MONGODB_URL:", process.env.MONGODB_URL);  
*/

import express, { request, response } from "express";      //install express [npm i express]
import { PORT, mongoDBURL } from "./config.js"; //import PORT and mongoDBURL from config.js
import mongoose from 'mongoose';    //install mongoose [npm i mongoose]
import { Customer } from './models/customerModel.js'; // import Customer model
import { MobilePhone } from "./models/mobileModel.js";  //import MobilePhone model
import { Order } from "./models/orderModel.js";  //import Order model
import customerRoute from './routes/customerRoute.js';  //import customerRoute
import mobileRoute from './routes/mobileRoute.js';      //import mobileRoute
import orderRoute from './routes/orderRoute.js';        //import orderRoute
import cors from 'cors';    //install cors [npm i cors]

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());

// //Option 2: Allow Custom Origins
// app.use(
//     cors({
//        origin: 'http://localhost:5555',
//        methods: ['GET', 'POST', 'PUT', 'DELETE'],
//        allowedHeaders: ['Content-Type'], 
//     })
// );

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to Assignment 5, using MERN Stack (without React)!');
});

app.use('/customer', customerRoute);    //for each request with customer, handle it with the customerRoute

app.use('/mobilePhone', mobileRoute);   //for each request with mobilePhone, handle it with mobileRoute

app.use('/order', orderRoute);   //for each request with order, handle it with orderRoute

// Connect to the database (MongoDB)
mongoose
    .connect(mongoDBURL)
    .then(() => {                                                   // if successful connection to database
        console.log('App connected to the database!');
        app.listen(PORT, () => {                                    // start the express server
            console.log(`App is listening to port: ${PORT}`);       // connect to server
        });
    })
    .catch((error) => {                                            // if unsuccessful connection to database
        console.log(error);
    });

