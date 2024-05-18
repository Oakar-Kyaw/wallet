const mongoose = require("mongoose")
require("dotenv").config()

const db_url = process.env.DB_URL
class Database {
    constructor(){}
    // private function to connect mongodb
    #connect(){
       const conn =  mongoose.connect(db_url)
    }
    // getter to work connect function
    get getConnect(){
       return this.#connect
    }
}

module.exports = Database