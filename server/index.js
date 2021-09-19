require('dotenv').config();
import express from 'express';
//importing midwares
import cors from 'cors';
import helmet from 'helmet';

import passport from 'passport';
import googleAuthConfig from './config/google.config';

//Routes
import Auth from "./API/Auth/index";
import Restaurant from "./API/Restaurant/index";
import Food from "./API/Food/index";
//Database Connection
import ConnectDB from './Database/connection';


const zomato = express();

//passport
googleAuthConfig(passport);

zomato.use(passport.initialize());
zomato.use(passport.session());

zomato.use(express.json());
zomato.use(express.urlencoded({extended: false}));
zomato.use(cors());
zomato.use(helmet());

zomato.get("/",(req,res) => {
    res.json({message: "Setup success"});
})

zomato.use("/auth", Auth);
zomato.use("/restaurant", Restaurant);
zomato.use("/food", Food);

zomato.listen(4000, () => 
    ConnectDB()
    .then(() => console.log("Server is up and running"))
    .catch(  () => console.log("Server is running but database connection failed"))
);