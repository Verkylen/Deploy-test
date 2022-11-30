import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
await mongoClient.connect();

const db = mongoClient.db('deployedDB');
const content = db.collection('content');

app.post('/input', async (req, res) => {
    const {body} = req;
    await content.insertOne(body);

    res.sendStatus(201);
});

app.get('/output', async ({}, res) => {
    const bodies = await content.find().toArray();
    res.send(bodies);
});

app.listen(5000, () => console.log('Express server listening on port ' + 5000));