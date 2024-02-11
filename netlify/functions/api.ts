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
import { config as dotenvConfig } from 'dotenv';
import { manageNotFound } from "dbConnection/middlewares/manageNotFound.js";

dotenvConfig();

const api = express();
const mogoUrl :string = process.env.MONGO_URL!;

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


api.use('/api/', router());
api.use('/.netlify/functions/', router());

// Error-handling middleware
api.use(manageNotFound);

 export const handler = serverless(api);

// const server = http.createServer(api);
// export default function () {
//     server.listen(, () => {
//         if (process.env.NODE_ENV === "development") {
//           // broadcastDevReady({ build: serverBuild });
//         }
//         console.log(`Express server listening on port ${8080}`);
//       });
// }