import mongoose from 'mongoose';

const FoodSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: true},
        isVeg: {type: Boolean, required: true},
        isContainsEgg: {type: Booolean, required: true},
        category: {type: String, required: true},
        photos:
        {
            type: mongoose.Types.ObjectId,
            ref: 'Images',
        },
        price: {type: Number, default: 150, required: true},
        addOns:
        [
            {
                tyoe: mongoose.Types.ObjectId,
                ref: 'Foods',
            }
        ],
        restaurant: 
        {
            tyoe: mongoose.Types.ObjectId,
            ref: 'Restaurants',
            requiredd: true,
        },
        

    },
    {
        typestamps: true,
    }
);
export const FoodModel = mongoose.model('Foods',FoodSchema);