import classes from "../../common/globalclasses.module.css";
import React from "react";
import ChartWrapper from "../../components/dashboard/ChartWrapper";
import Navbar from "../../components/dashboard/Navbar";
import Topbar from "../../components/dashboard/Topbar";

export default function Page() {
  return (
    <div className={classes.dashboardContent}>
      <Navbar />
      <Topbar />
      <ChartWrapper />
    </div>
  );
}
