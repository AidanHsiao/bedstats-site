import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ChartWrapper from "../../components/dashboard/index/ChartWrapper";
import NavBar from "../../components/dashboard/common/NavBar";
import TopBar from "../../components/dashboard/common/TopBar";
import ImprovementWrapper from "../../components/dashboard/index/ImprovementWrapper";
import { StatsObject } from "../../../lib/interfaces";
import { useRouter } from "next/router";
import getPass from "../../../lib/getPass";
import getUserByPass from "../../../lib/db/getUserByPass";
import PlaytimeWrapper from "../../components/dashboard/index/PlaytimeWrapper";
import getDashboardStats from "../../../lib/getDashboardStats";
import DashboardWrapper from "../../components/dashboard/common/DashboardWrapper";

export default function Page() {
  const [userData, setUserData]: [
    StatsObject[],
    Dispatch<SetStateAction<StatsObject[]>>
  ] = useState<StatsObject[]>([]);
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [showDashboard, setShowDashboard] = useState(false);
  const [width, setWidth] = useState(0);
  const [hypixelAPIKey, setHypixelAPIKey] = useState("");
  const [hours, setHours] = useState({ min: 0, max: 0 });
  const router = useRouter();

  useEffect(() => {
    if (!window) return;
    attemptLogin();
    setShowDashboard(true);
  }, []);

  useEffect(() => {
    if (!hypixelAPIKey) return;
    obtainStats();
  }, [hypixelAPIKey]);

  async function obtainStats() {
    const uuid =
      sessionStorage.getItem("uuid") || localStorage.getItem("uuid") || "";
    const dashboardStats = await getDashboardStats(hypixelAPIKey, uuid);
    setHours(dashboardStats.hours);
  }

  async function attemptLogin() {
    const pass = getPass();
    const user = await getUserByPass(pass);
    if (!user.password) {
      router.push("/login");
      return;
    }
    setUsername(user.username);
  }

  if (!username || !showDashboard) return <div></div>;
  return (
    <DashboardWrapper>
      <NavBar selected="overview" />
      <TopBar title="Stats Overview" />
      <ChartWrapper
        username={username}
        setError={setError}
        setUserData={setUserData}
        setHypixelAPIKey={setHypixelAPIKey}
      />
      <ImprovementWrapper userData={userData} error={error} />
      <PlaytimeWrapper error={error} hours={hours} />
    </DashboardWrapper>
  );
}
