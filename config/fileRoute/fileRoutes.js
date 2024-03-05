const fs = require("fs")
const path = require("path")
const express = require("express")
const app = express()
exports.loopFileRoute = (dir)=>{
   const base_dir = path.join(process.cwd() + "/routes")
   console.log(base_dir)
   const folders = fs.readdirSync(base_dir + (dir || ""))
   console.log(folders)
   for(let folder of folders){
      let pathes = path.join(base_dir + (dir || "")+ "/"+ folder) 
      let stats = fs.lstatSync(pathes)
      
      if(stats.isDirectory()){
        let file = ( dir || "") + "/"+ folder
        this.loopFileRoute(file)
      }
      else {
        console.log(pathes)
         return require(pathes)(app)
      }
      
   }
   
}