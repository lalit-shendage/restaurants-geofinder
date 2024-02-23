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
        type: Number,
        unique: true,
        default: function generateUniqueID() {
            let newID;
            do {
                newID = Math.floor(10000000 + Math.random() * 90000000); 
            } while (this.constructor.exists({ restaurant_id: newID })); 
            return newID;
        }
    }
});

restaurantSchema.index({ "address.coord": '2dsphere' });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
