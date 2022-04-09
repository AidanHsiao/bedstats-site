// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

// export default async function getUserStats(uuid: string) {
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

//   const col = await getDocs(collection(db, "users", uuid, "stats"));
//   console.log(col);
//   const data = col.docs.map((doc) => doc.data());

//   return data;
// }

export {};
