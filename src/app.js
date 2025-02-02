import express from 'express';
import bodyParser from 'body-parser';
import { configDotenv } from 'dotenv';
import faqRouter from './routes/faqRouter.js';
import { connectMongodb } from './config/mongodb.js';
import cors from 'cors'

const app = express()
configDotenv();

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', faqRouter);

app.get("/", async (req, res) => {
    try {
        res.send("hello developers!");
    } catch (err) {

        console.log(err);
    }
})

app.listen(port, async () => {
    await connectMongodb();
    console.log(`Sever is listening to port: ${port}`);
});