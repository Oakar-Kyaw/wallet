const fs = require("fs")

exports.fileCreate = () => {
    let pathes = ["./uploads/profile","./uploads/treatment", "./uploads/treatment-list", "./uploads/treatment-category", "./uploads/member-tier" ]
    //access file or not
    pathes.map(path => {
     fs.access(path,err =>{
      //to check if given directory
      if(err){
        //if current directory doesn't exist then create it
        fs.mkdir(path, { recursive: true }, error => {
            if(error){
                console.log(error)
            }else { 
                console.log("New Directory created successfully !!"); 
              } 
        })
       }
        else {
            console.log("Given directory already exists")
        }
    })
})
}