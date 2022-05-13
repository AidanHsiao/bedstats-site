import SignIn from "../components/login/SignIn";

export default function Page() {
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SignIn />
    </main>
  );
}
