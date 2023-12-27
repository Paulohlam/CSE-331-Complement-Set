import express from "express";
import { findNumbers } from "./routes";


// Configure and start the HTTP server.
const port = 8080;
const app = express();
app.use(express.static('public'));
app.get("/find", findNumbers);
app.listen(port, () => console.log(`Server listening on ${port}`));