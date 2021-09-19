import express from 'express';

//Database model
import {RestaurantModel} from '../../Database/allModel';

const Router = express.Router();

/*
Route           /restaurant
Des             Get all the restaurant details based on the city name
Params          none
Access          Public
Method          GET
*/
Router.get("/", async(req,res) =>
{
    try
    {
        const {city} = req.query;
        const restaurants = await RestaurantModel.find({city});
        return res.json({restaurants});
    }
    catch(error)
    {
        return res.status(500).json({error: error.message});
    }

});

/*
Route           /restaurant/id
Des             Get individual restaurant details based on id
Params          id
Access          Public
Method          GET
*/
Router.get("/:id", async (req,res) =>
{
    try
    {
        const {id} = req.params;
        const restaurant = await RestaurantModel.findById(id);

        if(!restaurant)
        {
            return res.status(400).json({error : "Restaurant not found"});
        }
        return res.json({restaurant});
    }
catch(error)
{
    return res.status(500).json({error: error.message});
}
});


/*
Route           /restaurant/search
Des             Get restaurant details based on search string
Params          none
Access          Public
Method          GET
*/
Router.get("/search", async(req,res) =>
{
    try
    {
        const {searchString} = req.body;

        const restaurants = await RestaurantModel.find({
            name: {$regex: searchString, $options: "i"} 
        });

        if(!restaurant)
        {
            return res.status(400).json({ error: `No restaurant matched with ${searchString}`});
        }
        return res.json({restaurants});
    }
    catch(error)    
    {
        return res.status(500).json({error: error.message});
    }
});
export default Router;