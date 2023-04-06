import express from 'express';
import routes from './routes/index.js';
var app = express();
var PORT = 5000;
app.use(express.json());
app.use(routes);
app.listen(PORT, function () { return console.log("Server is running in port ".concat(PORT)); });
