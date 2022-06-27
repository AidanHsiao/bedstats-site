import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getUserByPass from "../../../lib/db/getUserByPass";
import getDashboardStats from "../../../lib/getDashboardStats";
import getPass from "../../../lib/getPass";
import { KillDeathRatios, ResourceRatio } from "../../../lib/interfaces";
import DashboardWrapper from "../../components/dashboard/common/DashboardWrapper";
import NavBar from "../../components/dashboard/common/NavBar";
import TopBar from "../../components/dashboard/common/TopBar";
import HabitsWrapper from "../../components/dashboard/habits/HabitsWrapper";
import HabitChart from "../../components/dashboard/habits/HabitChart";

const resourceColors = ["#fa0", "#0ff", "#0f0"];
const kdColors = ["#aaa", "#f00c"];

export default function Page() {
  const [resourceRatios, setResourceRatios] = useState<ResourceRatio[]>([]);
  const [kdRatios, setKDRatios] = useState<KillDeathRatios>();
  const [username, setUsername] = useState("");
  const [dataReady, setDataReady] = useState(false);

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
    setKDRatios(dashboardStats.killDeathRatios);
    setDataReady(true);
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
      <HabitsWrapper title="Resource Ratios" topElement>
        <HabitChart
          values={[
            resourceRatios[0]?.forge,
            resourceRatios[0]?.diamond,
            resourceRatios[0]?.emerald,
          ]}
          colors={resourceColors}
          title="All"
        />
        <HabitChart
          values={[
            resourceRatios[1]?.forge,
            resourceRatios[1]?.diamond,
            resourceRatios[1]?.emerald,
          ]}
          colors={resourceColors}
          title="Solos"
        />
        <HabitChart
          values={[
            resourceRatios[2]?.forge,
            resourceRatios[2]?.diamond,
            resourceRatios[2]?.emerald,
          ]}
          colors={resourceColors}
          title="Doubles"
        />
        <HabitChart
          values={[
            resourceRatios[3]?.forge,
            resourceRatios[3]?.diamond,
            resourceRatios[3]?.emerald,
          ]}
          colors={resourceColors}
          title="Triples"
        />
        <HabitChart
          values={[
            resourceRatios[4]?.forge,
            resourceRatios[4]?.diamond,
            resourceRatios[4]?.emerald,
          ]}
          colors={resourceColors}
          title="Squads"
        />
      </HabitsWrapper>
      <HabitsWrapper title="Kill/Death Type Ratios">
        <HabitChart
          values={[
            kdRatios?.void?.kills as number,
            kdRatios?.damage?.kills as number,
          ]}
          colors={kdColors}
          title="Kills"
        />
        <HabitChart
          values={[
            kdRatios?.void?.deaths as number,
            kdRatios?.damage?.deaths as number,
          ]}
          colors={kdColors}
          title="Deaths"
        />
        <HabitChart
          values={[
            kdRatios?.void?.finalKills as number,
            kdRatios?.damage?.finalKills as number,
          ]}
          colors={kdColors}
          title="Final Kills"
        />
        <HabitChart
          values={[
            kdRatios?.void?.finalDeaths as number,
            kdRatios?.damage?.finalDeaths as number,
          ]}
          colors={kdColors}
          title="Final Deaths"
        />
      </HabitsWrapper>
    </DashboardWrapper>
  );
}
