const fs = require("fs")
const path = require("path")
const cors = require("cors")
const http = require("http")
const morgan = require("morgan")
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const Database = require("../../db/db")
require("dotenv").config()

class Server {
    constructor(){

    }
    registerMiddleware(){
     
    }
    startServer(){
        const port = process.env.PORT
        
        
        app.use(express.json())
        app.use(bodyParser.json({limit:"10mb"}))
        app.use(morgan("dev"))
        app.use(cors({
            "origin": "*",
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "preflightContinue": false,
            "optionsSuccessStatus": 204
          }))
        app.use("/uploads",express.static(path.join(process.cwd() + "/uploads")))
        // loop through routes
         this.registerRoute()
        //databse connect
        const db = new Database()
        db.getConnect()
        app.listen(port,function(){
            console.log("Server: ",port)
        })
       
    }
    registerRoute(dir =""){
        const self = this
        const base_dir = path.join(process.cwd() + "/routes")
        const folders = fs.readdirSync(base_dir + dir)
        for(let folder of folders){
            let pathes = path.join(base_dir + dir + "/"+ folder) 
            let stats = fs.lstatSync(pathes)
            if(stats.isDirectory()){
                self.registerRoute(dir+ "/"+ folder)
            }
            if(stats.isFile()){
                require(pathes)(app)
            }
            }
    }
}

module.exports= Server