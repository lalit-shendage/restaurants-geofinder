import express from 'express';
import verifyToken from '../middleware/validationMiddleware.js';
import restarantController from '../controllers/resturantController.js'

const router = express();

router.post('/create',verifyToken, restarantController.create)

router.post('/findByRadious',verifyToken, restarantController.findByRadious)

router.post('/findByMaxMinDistance',verifyToken, restarantController.findByMaxMinDistance)

router.put('/:id',verifyToken, restarantController.editRestaurant)

router.delete('/:id',verifyToken, restarantController.deleteRestaurant)

export default router;


