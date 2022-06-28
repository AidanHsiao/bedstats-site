import { StatsObject } from "../../../../../lib/interfaces";
import styles from "./main.module.scss";

export default function GeneralWrapper({ stats }: { stats: StatsObject }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>General Stats</div>
      <div className={styles.data}>
        {["finals", "score", "fkdr/", "kills", "beds", "wins"].map((item) => {
          let itemName = `${item.charAt(0).toUpperCase()}${item.slice(1)}`;
          if (itemName.includes("/")) itemName = itemName.toUpperCase();
          itemName = itemName.replace("/", "");
          return <Item itemName={itemName} stats={stats} key={Math.random()} />;
        })}
      </div>
    </div>
  );
}

interface ItemProps {
  stats: StatsObject;
  itemName: string;
}

export function Item(props: ItemProps) {
  const value = parseFloat(
    props.stats[props.itemName.toLowerCase() as keyof StatsObject]?.toFixed(
      2
    ) || ""
  );

  return (
    <div className={styles.item}>
      <div className={styles.itemTitle}>{props.itemName}</div>
      <div className={styles.itemNum}>
        {value || value === 0 ? value : "Loading..."}
      </div>
    </div>
  );
}
