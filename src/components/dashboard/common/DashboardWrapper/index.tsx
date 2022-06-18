import { ReactNode, useEffect, useState } from "react";
import styles from "./main.module.scss";

interface DashboardWrapperProps {
  children: ReactNode;
}

export default function DashboardWrapper({ children }: DashboardWrapperProps) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, []);
  return (
    <div
      className={width >= 1056 ? styles.dashboardContent : styles.fullDashboard}
    >
      {children}
    </div>
  );
}
