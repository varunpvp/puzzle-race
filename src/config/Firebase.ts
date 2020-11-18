import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

const Firebase = firebase.initializeApp(config);

export const Auth = Firebase.auth();
export const Database = Firebase.database();

export const getFirebaseServerTimestamp = async () => {
  try {
    const offsetSnap = await Firebase.database()
      .ref("/.info/serverTimeOffset")
      .once("value");

    return offsetSnap.val() + Date.now();
  } catch {
    console.error("Error while getting firebase server time offset");
    return NaN;
  }
};
