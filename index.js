const express = require("express")
const ip = require("ip")

const Server  = require("./config/server/server")
const { fileCreate } = require("./config/fileCreate/fileCreate")

const app = express()
const server = new Server 
server.startServer()
//automatically create file
fileCreate()
