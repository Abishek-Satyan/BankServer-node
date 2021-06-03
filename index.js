const express=require('express')
const app=express()
app.listen(3000,()=>{
    console.log("Server created at port 3000");
})
const session=require('express-session')
const dataService=require('./services/data.service')
app.use(express.json())

const authMiddleware=(req,res,next)=>{
    if(!req.session.currentuser){
        return res.json({
          statusCode:401,
          status:"false",
          message:"Please Login"
        })
      }
      else{
          next();
    }
}
app.use(session({
    secret:"randomsecretmessage",
    resave:false,
    saveUninitialized:false
}))
app.get('/',(req,res)=>{
    res.send("GET method");
})
app.post('/',(req,res)=>{
    res.send("POST method");
})
app.post('/register',(req,res)=>{
  dataService.registration(req.body.uname,req.body.accno,req.body.pswd)
  .then(result=>{
    res.status(result.statusCode).json(result)
  })
  
 //console.log(res.status(result.statusCode).json(result))

})
app.post('/login',(req,res)=>{
    dataService.login(req,req.body.accno,req.body.pswd)
    .then(result=>{res.status(result.statusCode).json(result)})
    
   
  
  })
  app.post('/deposit',authMiddleware,(req,res)=>{
      console.log(req.session.currentuser);
    dataService.deposit(req.body.accno,req.body.pswd,req.body.amount)
    .then(result=>{
      res.status(result.statusCode).json(result)
    })
    
   
  
  })
  app.post('/withdraw',authMiddleware,(req,res)=>{
   dataService.withdraw(req.body.accno,req.body.pswd,req.body.amount)
   .then(result=>{
    res.status(result.statusCode).json(result)
   
   })
    
  
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


