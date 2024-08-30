import mongoose from "mongoose";
import { Order } from "./orderModel.js"; //Import order model to access orders

//Entity: Customer

const customerSchema = new mongoose.Schema({            //object with fields inside - Customer Object with fields
    title: {
        type: String,
        required: true,
        enum: ["Mx", "Ms", "Mr", "Mrs", "Miss", "Dr", "Other"] // title has to be Mx, Ms, Mr, Mrs, Miss, Dr or Other
    },
    firstName: {
        type: String,
        required: true      //manditory
    },
    surname: {
        type: String,
        required: true      //manditory
    },
    mobile: {
        type: String,
        required: true      //manditory
    },
    emailAddress: {
        type: String,
        required: true,     //manditory
        unique: true     // Ensure email addresses are unique
    },
    homeAddress: {
        addressLine1: {
            type: String,
            required: true          //manditory
        },
        addressLine2: String,       // NOT Manditory
        town: {
            type: String,
            required: true          //manditory
        },
        county: {
            type: String,
            required: true          //manditory
        },
        EIRCODE: String             // NOT Manditory
    },
    shippingAddress: {
        addressLine1: {
            type: String,
            required: true           //manditory
        },
        addressLine2: String,        // NOT Manditory
        town: {
            type: String,
            required: true           //manditory
        },
        county: {
            type: String,
            required: true           //manditory
        },
        EIRCODE: String             // NOT Manditory
    }
}, { timestamps: true });

// Pre-remove middleware to handle cascading delete
customerSchema.pre('remove', async function(next) {
    try {
        // Remove all orders associated with the customer being deleted
        await Order.deleteMany({ customer: this._id });
        next();
    } catch (error) {
        next(error);
    }
});

export const Customer = mongoose.model('Customer', customerSchema);
