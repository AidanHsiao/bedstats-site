// import { initializeApp } from "firebase/app";
// import { getFirestore, setDoc, doc } from "firebase/firestore/lite";

// interface Friend {
//   username: string;
//   uuid: string;
// }

// export interface User {
//   username: string;
//   uuid: string;
//   password: string;
//   hypixelAPIKey: string;
//   friends: Friend[];
//   settings: {
//     theme: string;
//     animationEnabled: boolean;
//     animationRate: string;
//     hypixelAPIKey: string;
//     pollingRate: string;
//     loggingConfig: string;
//     scoreCutoff: number;
//     scoreConstant: number;
//     equations: {
//       stars: string;
//       fkdr: string;
//       bblr: string;
//       wlr: string;
//       finals: string;
//       beds: string;
//       wins: string;
//       fkdrMargin: number;
//       bblrMargin: number;
//       wlrMargin: number;
//       fkdrSecond: string;
//       bblrSecond: string;
//       wlrSecond: string;
//     };
//   };
// }
// export default async function setUser(uuid: string, user: User) {
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

//   await setDoc(doc(db, "users", uuid), user);
// }

export {};
