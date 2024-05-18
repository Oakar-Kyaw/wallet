"use strict"

const Utils = require("../utils/utils")

exports.verifyToken = (req,res,next) => {
    try {
      const utils = new Utils()
      let cacheUser = utils.getCacheUserDetail()
      if(!cacheUser){
        const header = req.headers["authorization"]
        if(header){
          const token = header.split("Bearer ")[1]
          if(token) {
              const decodeUser = utils.decodeToken(token)
              req["user"] = {
                ...decodeUser
              } 
              utils.setCacheUserDetail(req["user"])
              next()
          }   
        }else {
          res.status(401).send({
            error: true,
            message: "Unauthorized Access"
        })
      
        }
      }
      else{
        req["user"] = utils.getCacheUserDetail()
        next()
      }
    } catch (error) {
        res.status(500).send({
            error: true,
            message: error.message
        })
    }
    
}