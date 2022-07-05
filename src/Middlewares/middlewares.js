const jwt = require("jsonwebtoken");
const BlogsModel = require("../Models/BlogsModel.js");


//this function is for the purpose for the authentication
const isTokenValid = function (req, res, next) {
    try{
    let token = req.headers["x-api-key"]
    if(!token) return res.status(400).send("token is not present")
    let decodedToken = jwt.verify(token, "Project-1-Blogging-site")
    if (!decodedToken) {
        return res.status(400).send({ status: false, msg: "token is invalid" });
    }
    
        next()
    
}catch (err) {
    if(err.message=="invalid token") return res.status(400).send({status:false, msg:"invalid token"})
    if(err.message=="invalid signiture") return res.status(400).send({status:false, msg:"invalid signiture"})
    return res.status(500).send(err.message)
}}


//this token is for the purpose of authorisation
const isAuthorised = async function (req, res, next) {
    try{
    BlogId = req.params.blogId;
    let requiredBlog = await BlogsModel.findById(BlogId)
    if(!requiredBlog){
        return res.status(404).send("No such blog ")
    }
    let authorId = requiredBlog.authorId
    let token = req.headers["x-api-key"]
    let decodedToken = jwt.verify(token, "Project-1-Blogging-site")
    console.log(decodedToken)
    if (authorId == decodedToken.authorId) {
        next()
    }
    else {
        return res.status(403).send("you are not authorized to take this action")//403 for forbiden request
    }}catch (err) {
        if(err.message=="invalid token") return res.status(400).send({status:false, msg:"invalid token"})
    if(err.message=="invalid signiture") return res.status(400).send({status:false, msg:"invalid signiture"})
        return res.status(500).send(err.message)
    }
}



module.exports.isTokenValid = isTokenValid
module.exports.isAuthorised = isAuthorised