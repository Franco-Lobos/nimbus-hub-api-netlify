// // YOUR_BASE_DIRECTORY/netlify/functions/api.ts

// import express, { Router } from "express";
// import serverless from "serverless-http";

// const api = express();

// const router = Router();
// router.get("/hello", (req, res) => res.send("Hello World!"));

// api.use("/api/", router);

// export const handler = serverless(api);


import serverless from "serverless-http";
import { createRequestHandler } from "@remix-run/express";
import {  broadcastDevReady } from "@remix-run/node";
import express, { Router } from 'express';
import { ServerBuild } from '@remix-run/node'


import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from '../../dbConnection/router/index.js';
import http from 'node:http';

// notice that the result of `remix build` is "just a module"
import * as build from "@remix-run/dev/server-build";
import { config as dotenvConfig } from 'dotenv';
import { manageNotFound } from "dbConnection/middlewares/manageNotFound.js";


dotenvConfig();

const api = express();
const mogoUrl :string = process.env.MONGO_URL!;
const expressPort = 8080;


api.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

api.use(compression());
api.use(cookieParser()); 
api.use(express.static("public"));
api.use(bodyParser.json());  //!!IMPORTANT -> DO NOT USE BODYPARSER WITH REMIX IF IS A MIDDLEWARE API, IT WIL CRASH THE JSON 


//Db connection
mongoose.Promise = Promise;
mongoose.connect(mogoUrl);
mongoose.connection.on('error', (error)=>console.log(error));
mongoose.connection.once('open', function() {
  console.log("mongodb connection open");
});
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});


// Router
// const router2 = Router();
// router2.get("/hello", (req, res) => res.send("Hello World!"));
// api.use("/api/", router());

api.use('/api/', router());

// Error-handling middleware
api.use(manageNotFound);

// const server = http.createServer(api);

// // Start the server
// server.listen(expressPort, () => {
//   if (process.env.NODE_ENV === "development") {
//     // broadcastDevReady({ build: serverBuild });
//   }
//   console.log(`Express server listening on port ${expressPort}`);
// });

// export const handler = serverless(api);
export default serverless(api);