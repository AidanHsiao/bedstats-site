import SignIn from "../components/index/SignIn";
import classes from "../common/globalclasses.module.css";
import BackgroundImage from "../components/index/BackgroundImage";

const scale = 1;

export default function Page() {
  return (
    <div
      className={classes.screenContent}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BackgroundImage />
      <div
        style={{
          width: "35vw",
          height: "23vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${scale})`,
        }}
      >
        <SignIn />
      </div>
    </div>
  );
}
