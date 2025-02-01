import express from 'express';
import bodyParser from 'body-parser';
import { configDotenv } from 'dotenv';

const app= express()
configDotenv();

const port= process.env.PORT;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("hello users");
})

app.listen(port , () => {
    console.log(`Sever is listening to port: ${port}`);
});