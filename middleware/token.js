const JWT = require("jsonwebtoken");
const config = require("../config/config");

function generateTokenForUser(userData) {
  return jwt.sign({
    userId: userData.id,
    isAdmin: userData.isAdmin
  },
  JWT_SIGN_SECRET,
  {
    expiresIn: '24h'
  })
}

 function issueJWT(user) {
  // on génére le token
  const id = user.id;
  const expiresIn = "24H";
  const payload = {
    sub: id,
    iat: Date.now(),
  };
  const signedToken = JWT.sign(payload, "secret", { expiresIn: expiresIn });
  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
} 
function getUserId(req) {
  // on vérifie le userId du token
  const token = req.headers.authorization.split(" ")[1]; // on récupère le token de la requête entrante
  const decodedToken = JWT.verify(token, "secret"); // on le vérifie
  const userId = decodedToken.sub;
  return userId; // on récupère l'id du token
} 

function parseAuthorization(authorization) {
  return (authorization != null) ? authorization.replace('Bearer ', '') : null;
}


 
module.exports.issueJWT = issueJWT;
module.exports.getUserId = getUserId;
module.exports.parseAuthorization = parseAuthorization;