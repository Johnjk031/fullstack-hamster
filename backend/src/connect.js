const admin = require("firebase-admin");

let serviceAccount;
if (process.env.FIREBASEKEY) {
	serviceAccount = JSON.parse(process.env.FIREBASEKEY)
}
else {
	serviceAccount = require("./secrets/server-key.json");
}


function connect() {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount)
	});
	const db = admin.firestore()
	return db
}


module.exports = { connect }
