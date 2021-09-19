//Library
import express from 'express';
import passport from 'passport';

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
/*
Route:  /signin
Desc:   sign in user
param:  none
access: privite
method: POST
*/
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
/*
Route           /auth/google
Desc            Signin with email and password
Params          none
Access          Public
Method          POST
*/
Router.get(
    "/google",
    passport.authenticate("google", {
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ],
    })
);

/*
Route           /auth/google/callback
Desc            to redirect
Params          none
Access          Public
Method          POST
*/
Router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        return res.json({ token: req.session.passport.user.token });
    }
);

export default  Router;