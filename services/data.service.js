const db=require('./db')
useraccountDetails={
    100:{accno:100,username:"userone",password:"user1",balance:10000},
    101:{accno:101,username:"usertwo",password:"user2",balance:11000},
    102:{accno:102,username:"userthree",password:"user3",balance:15000},
  }

  const registration=(uname,accno,pswd)=>{
   return db.User.findOne({"accno":accno})
   .then(user=>{
     if(user){
       return{
         statusCode:422,
         status:false,
         message:"User exist please login"
       }
     }
     else{
       const newUser=new db.User({
         accno,
         username:uname,
         password:pswd,
         balance:0
       })
       newUser.save()
       return{
        statusCode:200,
        status:true,
        message:"registration success"
      }
     }
   })
   
    

  }
  const login=(req,accno,password)=>{
    console.log(accno)
    return db.User.findOne({accno,password})
    .then(user=>{
      if(user){
        req.session.currentuser=user
        console.log(user);
        return{
          statusCode:200,
          status:"true",
          message:"login Success "
        }
      }
      else{
        return{
          statusCode:424,
          status:"false",
          message:"Invalid account number or password "
        }
      }
    })
    
  
  }
  const deposit=(accno,pswd,amt)=>{
   
    var amount=parseInt(amt)
    return db.User.findOne({"accno":accno,"password":pswd})
    .then(user=>{
      if(!user){
        return{
          statusCode:422,
          status:"false",
          message:"Invalid account number and password "
        }
      }
      else{
        user["balance"]+=amount
        user.save()
        return{
          statusCode:200,
          status:"true",
          message:"Balance "+user["balance"]
        }
      }
    })
    
  }
 const withdraw=(accno,pswd,amt)=>{
    var amount=parseInt(amt)
    return db.User.findOne({"accno":accno,"password":pswd})
    .then(user=>{
      if(!user){
        return{
          statusCode:422,
          status:"false",
          message:"Invalid account number and password "
        }
      }
      else{
        if(user.balance <= 0){
          return{
           
              statusCode:401,
              status:"false",
              message:"Insufficient balance"
            
          }
        }
        user["balance"]-=amount
        user.save()
        return{
          statusCode:200,
          status:"true",
          message:"Balance "+user["balance"]
        }
      }
    })
    
  }


  module.exports={
      registration,
      login,
      deposit,
       withdraw
  }