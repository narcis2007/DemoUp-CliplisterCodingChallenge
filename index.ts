'use strict'
import express, { NextFunction, Request, Response } from "express";
import cors from 'cors'
import { getDbClient } from './getDbClient'
import AssetRouter from "./src/modules/assets/AssetRouter";
import { AssetModel } from "./src/modules/assets/AssetModel";

const PORT = 3001
const HOST = '0.0.0.0'

const client = getDbClient()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/assets', AssetRouter)

app.get('/', (req, res) => {
  res.json({ info: 'App is running!' })
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send('Sorry can\'t find that!');
});
app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`)
  console.log(`Connected to database "${client.database}"`)
})
