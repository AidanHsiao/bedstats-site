// import { initializeApp } from "firebase/app";
// import { collection, getDocs, getFirestore } from "firebase/firestore/lite";

// export default async function getUserList() {
//   const firebaseConfig = {
//     apiKey: process.env.apiKey,
//     authDomain: process.env.authDomain,
//     projectId: process.env.projectId,
//     storageBucket: process.env.storageBucket,
//     messagingSenderId: process.env.messagingSenderId,
//     appId: process.env.appId,
//     measurementId: process.env.measurementId,
//   };

//   const app = initializeApp(firebaseConfig);
//   const db = getFirestore(app);

//   const userCollection = await getDocs(collection(db, "users"));
//   return userCollection.docs.map((doc) => doc.data());
// }

export {};
