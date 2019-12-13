const express = require("express")
const router = express.Router()
const axios = require("axios");
const mkdirp = require("mkdirp")

// function imports
const saveProfilePicsMethods = require('../saveProfilePics')
const findDifferences = require('../findDifferences')

const orm = require("../config/orm")

router.get("/all",(req,res)=>{
  orm.selectAll(function(err,users){

    if(err){
      res.status(501).json({
        message:"couldn't query database"
      })
    }  
    res.json({data:users})
  })
})

router.post("/add",(req,res)=>{
  console.log(req);
  
  const userInfo = req.body
  mkdirp(`./instagram_users_profile_pics/${userInfo.profile_id}`)
  
  const imageName = saveProfilePicsMethods.imageNameExtracter(userInfo.profile_pic_url)
  const imagePath = `./instagram_users_profile_pics/${userInfo.profile_id}/${imageName}.jpg`
  saveProfilePicsMethods.profileImgSaver(userInfo.profile_pic_url,imagePath,function(){
  });
  
  orm.addUser(userInfo,function(err,data){
    if(err && err.errno===1062){

        res.status(501).json({
          type:"error",
          errno: 1062,
        })

    }else{
      res.json({
        type: "success"
      })
    }
  })  
})

router.get("/timeline",(req,res)=>{
  
  orm.selectAll(function(err,usersInfo){
    if(err){
      res.status(501).json({
        message:"couldnt connect to database"
      })}

      async function getAllInfos(usersInfo){
        let finalArray = []
        usersInfo.forEach((user)=>{
          finalArray.push(findDifferences(user))
        })
        const resolvedArray = await Promise.all(finalArray)
        return resolvedArray
      }
      result = getAllInfos(usersInfo)
      result.then(result=>{
        
        const changed_users = result.filter((user)=>{
          return user.changes.length!==0
        })
        res.json(changed_users)
      })
        
    }    
  )
  
})

router.delete("/delete/:id",function(req,res){  
  userId = req.params.id;

  orm.deleteUser(userId,function(err,data){
    if(err){
      res.status(501).json({
        message:`couldn't delete user ${userId}`
      })
    }else{
      return res.json({userId})
    }
  })
})

router.all("/update",(req,res)=>{
  const changes = req.body

  orm.updatingUser(changes,function(err,data){
    if(err){
      return res.status(501).json({
        message:"couldn't connect to database"
      })
    }else{
      return res.json(changes)
    }
  })
})

module.exports = router
