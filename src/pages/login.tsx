import SignIn from "../components/login/SignIn";
import classes from "../common/globalclasses.module.css";

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
      <SignIn />
    </div>
  );
}
