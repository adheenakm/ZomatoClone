require('dotenv').config();
import express from 'express';
//importing midwares
import cors from 'cors';
import helmet from 'helmet';

//Routes
import Auth from "./API/Auth/index";
//Database Connection
import ConnectDB from './Database/connection';


const zomato = express();

zomato.use(express.json());
zomato.use(express.urlencoded({extended: false}));
zomato.use(cors());
zomato.use(helmet());

zomato.get("/",(req,res) => {
    res.json({message: "Setup success"});
})

zomato.use("/auth", Auth);

zomato.listen(3000, () => 
    ConnectDB()
    .then(() => console.log("Server is up and running"))
    .catch(  () => console.log("Server is running but database connection failed"))
);