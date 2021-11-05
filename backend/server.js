import express, { application } from "express";
import cors from "cors";
import restaurants from "./api/restaurants.route.js";

const expressApp = express();

expressApp.use(cors());
expressApp.use(express.json());

expressApp.use("/api/v1/restaurants",restaurants);
expressApp.use("*",(req, res)=> res.status(404).json({error:"404 not found"}));

export default expressApp