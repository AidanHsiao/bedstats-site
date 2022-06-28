import styles from "./main.module.scss";

interface ResourceProps {
  values: number[];
  colors: string[];
  title: string;
}

const colorMapper = {
  "#fa0": "Forge (Gold) Items Collected",
  "#0ff": "Diamonds Collected",
  "#0f0": "Emeralds Collected",
  "#aaa": "Void Kills/Deaths",
  "#f00c": "Damage-Based Kills/Deaths",
};

export default function HabitChart(props: ResourceProps) {
  const chartSize = props.values.length * 65 + 20;

  return (
    <div
      className={styles.chartWrapper}
      style={{ width: chartSize, height: (chartSize * 3) / 4 }}
    >
      <div className={styles.chartValues}>
        {props.values.map((num, idx) => (
          <div className={styles.chartItemWrapper} key={Math.random()}>
            <span style={!num && num !== 0 ? { fontSize: 12 } : {}}>
              {num / Math.max(...props.values) < 0.5
                ? num
                : num === 0
                ? "None"
                : !num
                ? "Loading"
                : ""}
            </span>
            <div
              className={styles.chartItem}
              style={{
                height: `${(num / Math.max(...props.values)) * 100 || 0}%`,
                backgroundColor: props.colors[idx],
                fontSize: `${32 - num?.toString().length * 4 || 32}px`,
              }}
              title={colorMapper[props.colors[idx] as keyof typeof colorMapper]}
            >
              {num / Math.max(...props.values) >= 0.5 ? num : ""}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.title}>{props.title}</div>
    </div>
  );
}
