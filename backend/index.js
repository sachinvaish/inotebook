const express = require('express');
const app = express();
const cors = require('cors')

const connectToMongo=require('./db');
app.use(express.json());
app.use(cors());

connectToMongo();
const port = 5000;

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));


app.listen(port,()=>{
    console.log("App is running or port"+ port);
}) 