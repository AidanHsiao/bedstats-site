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
import GeneralWrapper from "../../components/dashboard/index/GeneralWrapper";

export default function Page() {
  const [userData, setUserData]: [
    StatsObject[],
    Dispatch<SetStateAction<StatsObject[]>>
  ] = useState<StatsObject[]>([]);
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [showDashboard, setShowDashboard] = useState(false);
  const [hours, setHours] = useState({ min: 0, max: 0 });
  const [stats, setStats] = useState<Partial<StatsObject>>({});
  const router = useRouter();

  useEffect(() => {
    attemptLogin();
    setShowDashboard(true);
  }, []);

  useEffect(() => {
    if (!username) return;
    obtainStats();
  }, [username]);

  async function obtainStats() {
    const dashboardStats = await getDashboardStats(username);
    setHours(dashboardStats.hours);
    setStats(dashboardStats.generalStats);
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
      <GeneralWrapper stats={stats as StatsObject} />
      <ChartWrapper
        username={username}
        setError={setError}
        setUserData={setUserData}
      />
      <ImprovementWrapper userData={userData} error={error} />
      <PlaytimeWrapper error={error} hours={hours} />
    </DashboardWrapper>
  );
}
