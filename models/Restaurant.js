import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
   address: {
        building: {
            type: String
        },
        coord: {
            type: [Number] 
        },
        street: {
            type: String
        },
        zipcode: {
            type: String
        }
    },
    borough: {
        type: String
    },
    cuisine: {
        type: String
    },
    grades: [
        {
            date: {
                type: Date
            },
            grade: {
                type: String
            },
            score: {
                type: Number
            }
        }
    ],
    name: {
        type: String,
        require: true
    },
    restaurant_id: {
        type: String,
        unique: true
    }
});

restaurantSchema.index({ location: '2dsphere' });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
