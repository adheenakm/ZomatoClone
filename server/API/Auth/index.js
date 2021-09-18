//Library
import express from 'express';

//Models
import {UserModel} from '../../Database/User/index';

const Router = express.Router();

/*
Route:  /signup
Desc:   Register new user
param:  none
access: privite
method: POST
*/

Router.post("/signup", async (req, res) => {
    try {
               
        await UserModel.findByEmailAndPhone(req.body.credentials);       
        //save to db
        const newUser = await UserModel.create(req.body.credentials);
        const token = newUser.generateJwtToken();        
        return res.status(200).json({ token, status: "success" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
Router.post("/signin", async(req,res) =>{
    try
    {
       const user = await UserModel.findByEmailAndPassword(req.body.credentials);
       const token = user.generateJwtToken();
    return res.status(200).json({ token, status: "success" });

    }
    catch(error)
    {
        return res.status(500).json({error : error.message});
    }
    
});
export default  Router;