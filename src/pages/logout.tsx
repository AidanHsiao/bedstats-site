import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    if (!window) return;
    sessionStorage.clear();
    localStorage.clear();
    router.push("/");
  });

  return <div></div>;
}
