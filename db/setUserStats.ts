import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore/lite";

export interface Stats {
  fkdr: number;
  bblr: number;
  wlr: number;
  finals: number;
  beds: number;
  wins: number;
  stars: number;
  score: number;
  timestamp?: number;
}

export default async function setUserStats(uuid: string, stats: Stats) {
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
  const timestamp = Math.floor(Date.now() / 1000);

  stats.timestamp = timestamp;

  await setDoc(doc(db, "users", uuid, "stats", `${timestamp}`), stats);
}
