import express from "express";
import { isAuthenticated } from "../middlewares";

export default (router:express.Router)=>{
    router.get("/hello", (req, res) => res.send("Hello World!"));
    router.get('/*',isAuthenticated);
}