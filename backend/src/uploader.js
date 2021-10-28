var admin = require("firebase-admin");

let serviceAccount;
if (process.env.FIREBASEKEY) {
	serviceAccount = JSON.parse(process.env.FIREBASEKEY)
}
else {
	serviceAccount = require("./secrets/server-key.json");
}
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'firebase-adminsdk-vin1g@hamster-server.iam.gserviceaccount.com'
  });



const firestore = admin.firestore();
const path = require('path');
const fs = require('fs');
const directoryPath = path.join(__dirname, 'files');




fs.readdir(directoryPath, function(err, files) {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }

  files.forEach(function(file) {
    var lastDotIndex = file.lastIndexOf('.');
    var menu = require('./files/' + file);

    menu.forEach(function(obj) {
      firestore
        .collection(file.substring(0, lastDotIndex))
        .add(obj)
        .then(function(docRef) {
          console.log('Document written', docRef.id);
        })
        .catch(function(error) {
          console.error('Error adding document: ', error);
        });
    });
  });
});
module.exports = { firestore }

