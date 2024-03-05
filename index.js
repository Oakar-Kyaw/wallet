const express = require("express")
const ip = require("ip")

const Server  = require("./config/server/server")
const app = express()
const server = new Server 
server.startServer()
