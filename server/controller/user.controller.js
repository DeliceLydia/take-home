const UserModel = require('../models/User')
const brycr = require('bcrypt')
const jwt = require('jsonwebtoken')


const loginUser = async(req,res)=>{
    const {email,password} = req.body
    const user  = await UserModel.findOne({email})
    if( user && (await brycr.compare(password,user.password))){
        await user.save()
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'3h'})
        res.status(200).json({
            message:'success',
            data:{
                _id : user._id,
                token:token
               
            },
            status: 200
        })
    }else{
        res.status(400).json({
            message:'failed',
            status:400
        })
        
    }

}



const signup = async (req,res) =>{
    const {email,name,password}= req.body
    const inopp = ['joe','asn','das']
    try{
    const salt = await brycr.genSalt(10)
    const haspassword = await brycr.hash(password,salt)
    const allemail = await UserModel.findOne({email})
    
    for (let i = 0; i<inopp.length;i++) {
        if(name == inopp[i]){
            res.json({
                message:"name is invalid"
              })
            return
        }
    }

    if(allemail){
      res.json({
        message:"email already exist"
      })
    }else if(!email.includes('@')){
        res.json({
            message:"email is invalid"
          })
    }
    const saveuser = await UserModel.create({
        email,
        name,
        password:haspassword,
      })
      if(saveuser){
        res.json({
          message:"successfully",
          data:saveuser
        })
      }else{
        res.json({
          message:"failed"
        })
      }
  
    }catch(err){
      console.log(err)
    }
  
  }


  module.exports = {
    signup,
    loginUser
}
