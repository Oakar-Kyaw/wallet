const { default: axios } = require("axios")
const Utils = require("../../utils/utils")

// const utils = new Utils()
// const user = utils.getCacheUserDetail()
// console.log("user",user)  
// const Api = axios.create({
//     baseURL: `${user.clinicBaseURL}`,
//     headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${user.clinicToken}`
//             }
// })
// exports.Api = axios.create({
//     baseURL: "http://localhost:2000/api/",
//     headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGluaWNJZCI6IjY1ZTdmNDI1OTZmNWQ1ZTZkZGE1NWZjMCIsIm5hbWUiOiJWaWN0b3Jpb3VzIiwiaWF0IjoxNzA5NzAwMTMzfQ.vAwEdfdM-cZ3haFDcTWgKB4shNgF9eO9aqOKf7Yxaq4`
//             }
// })
exports.Api = (url,token) => {
    return axios.create({
            baseURL: `${url}`,
            headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
}
