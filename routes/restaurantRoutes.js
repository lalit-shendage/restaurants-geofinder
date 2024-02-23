import express from 'express';
import restarantController from '../controllers/resturantController.js'

const router = express();

router.post('/create', restarantController.create)

router.post('/findByRadious', restarantController.findByRadious)

router.post('/findByMaxMinDistance', restarantController.findByMaxMinDistance)

router.put('/:id', restarantController.editRestaurant)

router.delete('/:id', restarantController.deleteRestaurant)

export default router;


