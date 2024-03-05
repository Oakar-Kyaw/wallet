exports.verifyToken = (req,res,next) => {
    try {
      const header = req.headers["authorization"]
      if(header){
        const token = header.split("Bearer ")[1]
        if(token) {
            next()
        }  
      }else {
         res.status(401).send({
           error: true,
           message: "Unauthrization Accessed"
       })
     
      }
     
    } catch (error) {
        res.status(500).send({
            error: true,
            message: error.message
        })
    }
    
}