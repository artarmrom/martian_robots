let admin = require("firebase-admin");

let serviceAccount = require("./martial-robots-firebase-adminsdk-buxvw-f69588610d.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports=admin;