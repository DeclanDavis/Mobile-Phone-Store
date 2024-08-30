import mongoose from "mongoose";
import { Order } from "./orderModel.js"; //Import order model to access orders
//entity: MobilePhone

const mobileSchema = new mongoose.Schema({
    manufacturer: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

// Pre-remove middleware to handle cascading delete
mobileSchema.pre('remove', async function(next) {
    try {
        // Remove the mobile phone from all orders that contain it
        await Order.updateMany(
            { 'items.mobilePhone': this._id },
            { $pull: { items: { mobilePhone: this._id } } }
        );
        next();
    } catch (error) {
        next(error);
    }
});


export const MobilePhone = mongoose.model('MobilePhone', mobileSchema);