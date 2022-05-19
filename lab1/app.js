const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())



app.get("/",async (req,res)=>{
    await res.status(200).send("Good")
    
})
// app.use('*', (req, res)=>{
//     res.status(404).send('what???');
//   });

app.post("/user",(req,res)=>{
    const id  = req.body.name
    console.log(req.body)
    if( id == "Mew"){
        res.status(200).send("Good")
    }
    else{
        res.status(400).send("Not")
    }
   
})

app.listen(3000,()=>{
    console.log("Sever Start At -----> 3000");
})