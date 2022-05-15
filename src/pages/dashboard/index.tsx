import classes from "../../common/globalclasses.module.css";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ChartWrapper from "../../components/dashboard/ChartWrapper";
import Navbar from "../../components/dashboard/Navbar";
import Topbar from "../../components/dashboard/Topbar";
import ImprovementWrapper from "../../components/dashboard/ImprovementWrapper";
import { StatsObject } from "../../../lib/interfaces";
import { useRouter } from "next/router";

export default function Page() {
  const [userData, setUserData]: [
    StatsObject[],
    Dispatch<SetStateAction<StatsObject[]>>
  ] = useState<StatsObject[]>([]);
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const router = useRouter();
    if (!window) return;
    const pass = sessionStorage.getItem("pass") || localStorage.getItem("pass");
    const username =
      sessionStorage.getItem("username") ||
      localStorage.getItem("username") ||
      "";
    if (!pass) router.push("/login");
    setUsername(username);
  }, []);
  if (!username) return <div></div>;
  return (
    <div className={classes.dashboardContent}>
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
