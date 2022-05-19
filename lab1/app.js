const express = require('express')
const app = express()
// const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json())



app.get("/",async (req,res)=>{
    await res.status(200).send("Good")
    
})
app.use('*', (req, res)=>{
    res.send('what???', 404);
  });

app.listen(3000,()=>{
    console.log("Sever Start At -----> 3000");
})