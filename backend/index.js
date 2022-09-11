const express = require('express');
const app = express();

const connectToMongo=require('./db');
app.use(express.json());

connectToMongo();

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));


app.listen(80,()=>{
    console.log("App is running or port 80");
})