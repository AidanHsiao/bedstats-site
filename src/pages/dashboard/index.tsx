import classes from "../../common/globalclasses.module.css";
import React, { useEffect, useState } from "react";
import ChartWrapper from "../../components/dashboard/ChartWrapper";
import Navbar from "../../components/dashboard/Navbar";
import Topbar from "../../components/dashboard/Topbar";
import ImprovementWrapper from "../../components/dashboard/ImprovementWrapper";
import { setCookies, getCookies, removeCookies } from "cookies-next";

export default function Page() {
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    setCookies("bruh", "cringe", {
      expires: new Date(Date.now() + 1000 * 3600 * 24 * 7),
    });
  }, []);

  return (
    <div className={classes.dashboardContent}>
      <Navbar />
      <Topbar />
      <ChartWrapper
        username="Girly_Mike"
        setError={setError}
        setUserData={setUserData}
      />
      <ImprovementWrapper userData={userData} error={error} />
    </div>
  );
}
