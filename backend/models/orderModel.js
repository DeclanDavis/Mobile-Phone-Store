import mongoose from "mongoose";

//relationship: Order

const orderSchema = new mongoose.Schema({
    customer: {                                 //customer who placed order
        type: mongoose.Schema.Types.ObjectId,   //refs Customer model using ObjectId
        ref: 'Customer',
        required: true
    },
    items: [{
        mobilePhone: {                                  //mobiles purchased
            type: mongoose.Schema.Types.ObjectId,       // refs MobilePhone model using ObjectId
            ref: 'MobilePhone',
            required: true
        },
        quantity: {                                     //quantity ordered
            type: Number,
            required: true,
            default: 1 // Default quantity is 1 if not specified
        }
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        required: true,
        default: Date.now // Default order date is the current date
    }
}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);