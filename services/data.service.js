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
  const login=(req,accno,pswd)=>{
  
    return db.User.findOne({"accno":accno,"password":pswd})
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
    let user=useraccountDetails
    if(accno in user)
    {
      if(pswd==user[accno]["password"]){
        user[accno]["balance"]+=amount
        console.log(user[accno]["balance"])
        return{
          statusCode:200,
          status:"true",
          message:"Balance "+user[accno]["balance"]
        }
       
        
      }
      else{
        return{
          statusCode:422,
          status:"false",
          message:"Invalid account number and password"
        }
      }
    }
    else{
      return{
        statusCode:422,
        status:"false",
        message:"Invalid account number and password"
      }
    }
  }
 const withdraw=(accno,pswd,amt)=>{
    var amount=parseInt(amt)
    let user=useraccountDetails
    if(accno in user)
    {
      if(pswd==user[accno]["password"]){
        user[accno]["balance"]-=amount
        console.log(user[accno]["balance"])
        return{
          statusCode:200,
          status:"true",
          message:"Balance "+user[accno]["balance"]
        }
       
        
      }
      else{
        return{
          statusCode:422,
          status:"false",
          message:"Invalid account number and password "
        }
      }
    }
    else{
      return{
        statusCode:422,
        status:"false",
        message:"Invalid account number and password "
      }
    }
  }


  module.exports={
      registration,
      login,
      deposit,
       withdraw
  }