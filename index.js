import express from "express";
import bodyParser from "body-parser";
import { getLog } from "./services/ampq.js";

const app = express();
const PORT = 5001;

app.use(bodyParser.json());

app.get("/log", (req, res) => {
    res.send(getLog());
});

app.listen(PORT, () => console.log("Server running"));