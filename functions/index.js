const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firestore);
const db = admin.firestore();

exports.createUsers = functions.https.onRequest((request, response) => {
  const user = request.query.user;
  console.log("test", user);
  db.collection("users")
    .doc(user.uid)
    .set({
      emailVerified: user.emailVerified,
      email: user.email,
      phoneNumber: user.phoneNumber,
      firstName: "",
      lastName: "",
      zone: 0,
      streetAddress: "",
      photoURL:
        "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
      created: user.metadata.creationTime,
      displayName: user.email.split("@")[0],
      assigned: false,
      role: "user",
    });
  response.send("All good");
});
