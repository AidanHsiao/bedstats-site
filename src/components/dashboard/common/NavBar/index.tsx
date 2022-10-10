import { useRouter } from "next/router";
import styles from "./main.module.scss";

const links = [
  {
    id: "overview",
    name: "Overview",
    title: false,
  },
  {
    id: "habits",
    name: "Your BedWars Habits",
    title: false,
  },

  {
    id: "settings",
    name: "Settings",
    title: true,
  },

  {
    id: "settings",
    name: "General Settings",
    title: false,
  },

  {
    id: "site_settings",
    name: "Website Settings",
    title: false,
  },
];

export default function NavBar(props: { selected: string }) {
  const router = useRouter();

  return (
    <div className={styles.navbar}>
      <div className={styles.title} style={{ paddingTop: 10 }}>
        About You
      </div>
      {links.map((object) => (
        <div
          key={Math.random()}
          className={
            object.title
              ? styles.title
              : `${styles.link} ${
                  props.selected === object.id ? styles.selectedLink : ""
                }`
          }
          onClick={() => {
            if (!object.title)
              router.push(
                `/dashboard${object.id !== "overview" ? `/${object.id}` : ""}`
              );
          }}
        >
          {object.name}
        </div>
      ))}
    </div>
  );
}
