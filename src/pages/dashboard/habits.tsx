import DashboardWrapper from "../../components/dashboard/common/DashboardWrapper";
import NavBar from "../../components/dashboard/common/NavBar";
import TopBar from "../../components/dashboard/common/TopBar";

export default function Page() {
  return (
    <DashboardWrapper>
      <NavBar selected="habits" />
      <TopBar title="BedWars Habits" />
    </DashboardWrapper>
  );
}
