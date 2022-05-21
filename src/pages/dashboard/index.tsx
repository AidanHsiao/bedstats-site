import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ChartWrapper from "../../components/dashboard/ChartWrapper";
import Navbar from "../../components/dashboard/Navbar";
import Topbar from "../../components/dashboard/Topbar";
import ImprovementWrapper from "../../components/dashboard/ImprovementWrapper";
import { StatsObject } from "../../../lib/interfaces";
import { useRouter } from "next/router";
import getPass from "../../../lib/getPass";
import getUserByPass from "../../../lib/db/getUserByPass";

export default function Page() {
  const [userData, setUserData]: [
    StatsObject[],
    Dispatch<SetStateAction<StatsObject[]>>
  ] = useState<StatsObject[]>([]);
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [showDashboard, setShowDashboard] = useState(false);
  const [width, setWidth] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!window) return;
    attemptLogin();
    setShowDashboard(true);
    setUsername(username);
    setWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, []);

  async function attemptLogin() {
    const pass = getPass();
    const user = await getUserByPass(pass);
    if (!user.password) {
      router.push("/login");
      return;
    }
  }

  if (!username || !showDashboard) return <div></div>;
  return (
    <div className={width >= 1056 ? "dashboardContent" : "fullDashboard"}>
      <style jsx global>{`
        .dashboardContent {
          width: calc(95vw - 200px);
          height: 100%;
          position: absolute;
          top: 0;
          left: calc(5vw + 200px);
          transition: width 0.2s;
        }

        .fullDashboard {
          width: 100vw;
          left: 0;
        }
      `}</style>
      <Navbar />
      <Topbar />
      <ChartWrapper
        username={username}
        setError={setError}
        setUserData={setUserData}
      />
      <ImprovementWrapper userData={userData} error={error} />
    </div>
  );
}
