import { ReactElement } from "react";
import styles from "./main.module.scss";

interface FriendsProps {
  opacity: number;
  friends: string[];
  importButton: string;
  import: () => void;
  continue: () => void;
}

export default function FriendsData(props: FriendsProps): ReactElement {
  return (
    <div
      className={styles.friendsWrapper}
      style={{ opacity: props.opacity, zIndex: props.opacity }}
    >
      <div className={styles.friendsCount}>
        You have {props.friends.length <= 50 ? props.friends.length : "50+"}{" "}
        friends.
      </div>
      <div className={styles.friendsText}>
        {props.friends.length
          ? `Would you like to import your
        ${props.friends.length > 50 ? " first 50 " : " "}friends into the
        BedStats friends database?`
          : "L + Ratio + Stay Mad + Hoes Mad + Basic + Skill Issue + You Fell Off + The Audacity + Touch Grass"}
        <br />
      </div>
      <div className={styles.friendsSubtitle}>
        {props.friends.length
          ? "This allows for automatic comparison of your friends, using the BedStats Leaderboard."
          : "Feels bad, get some friends first. Then you can compare them with BedStats! :D"}
      </div>
      <div className={styles.friendsOptions}>
        <div className={props.importButton} onClick={props.import}>
          {props.friends.length ? "Yes, Import Friends" : "Unable to Import"}
        </div>
        <div className={styles.friendsDeny} onClick={props.continue}>
          {props.friends.length ? "No, Keep It Empty For Now" : "Continue"}
        </div>
      </div>
    </div>
  );
}
