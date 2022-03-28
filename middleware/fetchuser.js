const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'secret' ;

const fetchuser = (req, res, next) =>{
    const token = req.header('authtoken');
    if(!token){
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, SECRET_KEY);
        req.user = data;
        next();
    } catch (err) {
        res.status(401).send({ error: "Invalid authentication. Please login/signup first" });
    }
}

module.exports = fetchuser;