import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDoc,
  doc,
  DocumentData,
} from "firebase/firestore/lite";

interface User {
  code: number;
  msg: string;
  username?: string;
  uuid?: string;
  user?: DocumentData;
}

export default async function getUser(username: string): Promise<User> {
  const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId,
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const userData = await fetch(
    `https://api.ashcon.app/mojang/v2/user/${username}`
  )
    .then((res) => res.json())
    .catch((e) => {});
  if (!userData) {
    return {
      code: 3,
      msg: "Connection lost. Make sure you are connected to the internet.",
    };
  }
  if (userData.error) {
    return {
      code: 2,
      msg: "That username was not found in the Mojang database. Try again.",
    };
  }
  const uuid = userData.uuid;
  const data = await getDoc(doc(db, "users", uuid));
  if (data.exists()) {
    return {
      code: 0,
      msg: "That user already exists. Please log in instead, or reset your password.",
      username: userData.username,
      uuid: userData.uuid,
      user: data.data(),
    };
  } else {
    return {
      code: 1,
      msg: "That user does not exist. Please try again.",
      username: userData.username,
      uuid: userData.uuid,
    };
  }
}
