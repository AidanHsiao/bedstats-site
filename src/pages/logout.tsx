import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    if (!window) return;
    sessionStorage.removeItem("pass");
    localStorage.removeItem("pass");
    router.push("/");
  });

  return <div></div>;
}
