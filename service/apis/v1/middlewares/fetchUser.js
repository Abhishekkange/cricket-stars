var jwt = require('jsonwebtoken');
const constants = require('../constants')


const fetchUser = (req,res,next)=>{

    //get the user from JWT token
    const token = req.header('auth-token');
    if(!token){

        res.send("enter token");
    }

    try {

        const verifyuser = jwt.verify(token,constants.jwt_key);
        console.log(verifyuser);
        req.user = verifyuser;
        next();
        
    } catch (error) {
        
        res.send("not getting data from the token");
    }
    

}


module.exports = fetchUser;