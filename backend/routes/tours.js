import express from 'express'
import { createTour, 
        deleteTour, 
        getAllTour, 
        getSingleTour, 
        updateTour, 
        getTourBySearch, 
        getFeaturedTour, 
        getTourCount} from '../controllers/tourController.js'
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router()

//create new tour
router.post('/create',verifyAdmin,createTour);

//update tour
router.put('/:id',verifyAdmin,updateTour);

//delete tour
router.delete('/:id',verifyAdmin,deleteTour);

//get single tour
router.get('/:id',getSingleTour);

//get All tour
router.get('/',getAllTour);

//get tour by search
router.get('/search/getTourBySearch', getTourBySearch);
router.get('/search/getFeaturedTour', getFeaturedTour);
router.get('/search/getTourCount', getTourCount);



export default router;