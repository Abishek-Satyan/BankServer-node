const express=require('express')
const app=express()
app.get('/',(req,res)=>{
    res.send("GET method");
})
app.post('/',(req,res)=>{
    res.send("POST method");
})
app.put('/',(req,res)=>{
    res.send("PUT method");
})
app.patch('/',(req,res)=>{
    res.send("PATCH method");
})
app.delete('/',(req,res)=>{
    res.send("Delete method");
})

app.listen(3000,()=>{
    console.log("Server created at port 3000");
})

