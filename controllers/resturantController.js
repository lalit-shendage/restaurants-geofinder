import Restaurant from '../models/Restaurant.js'

const create=async (req, res) => {
    try {
        const newRestaurant = new Restaurant(req.body);
        const savedRestaurant = await newRestaurant.save();
        res.status(201).json(savedRestaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const findByRadious= async (req, res) => {
    try {
        console.log(req.body)
        const { latitude, longitude, radius } = req.body;
            const restaurants = await Restaurant.find({
                "address.coord": {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude]
                        },
                        $maxDistance: radius
                    }
                }
            });
            console.log(restaurants)
            res.json(restaurants);
            
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const findByMaxMinDistance=async (req, res) => {
    try {
        const { latitude, longitude, minDistance, maxDistance } = req.body;
        const restaurants = await Restaurant.find({
            "address.coord": {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $minDistance: minDistance,
                    $maxDistance: maxDistance
                }
            }
        });
        res.json(restaurants);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const editRestaurant= async (req, res) => {
    try {
        const { id } = req.params;
        const { grades: newGrades, ...rest } = req.body;

        const restaurant = await Restaurant.findById(id);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        Object.assign(restaurant, rest);

        if (Array.isArray(newGrades) && newGrades.length > 0) {
            const currentDate = new Date();
            newGrades.forEach(grade => {
                grade.date = currentDate;
                restaurant.grades.push(grade);
            });
        }

        const updatedRestaurant = await restaurant.save();

        res.json(updatedRestaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteRestaurant= async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await Restaurant.findByIdAndDelete(id);
        res.json(restaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export default {
    create,
    findByRadious,
    findByMaxMinDistance,
    editRestaurant,
    deleteRestaurant
}