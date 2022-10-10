import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getUserByPass from "../../../lib/db/getUserByPass";
import getPass from "../../../lib/getPass";
import { UserSettings } from "../../../lib/interfaces";
import DashboardWrapper from "../../components/dashboard/common/DashboardWrapper";
import NavBar from "../../components/dashboard/common/NavBar";
import TopBar from "../../components/dashboard/common/TopBar";
import { SettingsInput } from "../../components/dashboard/settings/SettingsInput";

type SettingTypes = {
  [key: string]: {
    type: "boolean" | "enum" | "uuid" | "equations" | "number";
    values?: string[];
  };
};

const settingTypes: SettingTypes = {
  animationEnabled: {
    type: "boolean",
  },
  animationRate: {
    type: "enum",
    values: ["20 FPS", "40 FPS", "50 FPS", "100 FPS"],
  },
  equations: {
    type: "equations",
  },
  hypixelAPIKey: {
    type: "uuid",
  },
  loggingConfig: {
    type: "enum",
    values: ["Vanilla", "Badlion", "Lunar"],
  },
  pollingRate: {
    type: "enum",
    values: ["0.2s", "0.5s", "1s"],
  },
  scoreConstant: {
    type: "number",
  },
  scoreCutoff: {
    type: "number",
  },
  theme: {
    type: "enum",
    values: ["Monotone", "Snowy Sky", "Midnight", "Aquarium"],
  },
};

export default function Page() {
  const [settings, setSettings] = useState<Partial<UserSettings>>({});

  useEffect(() => {
    async function attemptLogin() {
      const pass = getPass();
      const user = await getUserByPass(pass);
      if (!user.password) {
        router.push("/login");
        return;
      }
      setSettings(user.settings);
    }

    attemptLogin();
  }, []);

  const router = useRouter();

  const settingsArray = Object.keys(settings).length
    ? Object.keys(settings)
        .filter((key) => key !== "equations")
        .sort()
        .concat(["equations"])
    : [];

  return (
    <DashboardWrapper>
      <NavBar selected="settings" />
      <TopBar title="General Settings" />
      {settingsArray.map((key, idx) => (
        <SettingsInput
          key={Math.random()}
          name={key}
          value={(settings as UserSettings)[key as keyof UserSettings]}
          type={settingTypes[key].type}
          isFirst={!idx}
          enumValues={settingTypes[key]?.values}
        />
      ))}
    </DashboardWrapper>
  );
}
