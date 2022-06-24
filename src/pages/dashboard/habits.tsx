import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getUserByPass from "../../../lib/db/getUserByPass";
import getDashboardStats from "../../../lib/getDashboardStats";
import getPass from "../../../lib/getPass";
import { ResourceRatio } from "../../../lib/interfaces";
import DashboardWrapper from "../../components/dashboard/common/DashboardWrapper";
import NavBar from "../../components/dashboard/common/NavBar";
import TopBar from "../../components/dashboard/common/TopBar";
import HabitsWrapper from "../../components/dashboard/habits/HabitsWrapper";
import ResourceChart from "../../components/dashboard/habits/ResourceChart";

export default function Page() {
  const [resourceRatios, setResourceRatios] = useState<ResourceRatio[]>([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    attemptLogin();
  }, []);

  useEffect(() => {
    if (!username) return;
    obtainStats();
  }, [username]);

  async function obtainStats() {
    const dashboardStats = await getDashboardStats(username);
    setResourceRatios(dashboardStats.resourceRatios);
  }

  const router = useRouter();

  async function attemptLogin() {
    const pass = getPass();
    const user = await getUserByPass(pass);
    if (!user.password) {
      router.push("/login");
      return;
    }
    setUsername(user.username);
  }

  return (
    <DashboardWrapper>
      <NavBar selected="habits" />
      <TopBar title="BedWars Habits" />
      <HabitsWrapper title="Resource Ratios">
        <ResourceChart resourceRatio={resourceRatios[0]} title="All" />
        <ResourceChart resourceRatio={resourceRatios[1]} title="Solos" />
        <ResourceChart resourceRatio={resourceRatios[2]} title="Doubles" />
        <ResourceChart resourceRatio={resourceRatios[3]} title="Triples" />
        <ResourceChart resourceRatio={resourceRatios[4]} title="Squads" />
      </HabitsWrapper>
    </DashboardWrapper>
  );
}
