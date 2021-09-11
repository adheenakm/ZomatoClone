import express from 'express';
//importing midwares
import cors from 'cors';
import helmet from 'helmet';

const zomato = express();

zomato.use(express.json());
zomato.use(express.urlencoded({extended: false}));
zomato.use(cors());
zomato.use(helmet());

zomato.get("/",(req,res) => {
    res.json({message: "Setup success"});
})

zomato.listen(3000, () => console.log("Server is up and running!"));