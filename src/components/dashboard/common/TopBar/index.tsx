import styles from "./main.module.scss";
import DropdownMenu from "./DropdownMenu";
import logo from "../../../../../public/logo.png";
import Image from "next/image";
import { useRouter } from "next/router";

export default function TopBar(props: { title: string }) {
  const router = useRouter();

  return (
    <div className={styles.topbar}>
      <div className={styles.logo} onClick={() => router.push("/")}>
        <Image src={logo} layout="fill" />
      </div>
      <div className={styles.title}>{props.title}</div>
      <DropdownMenu />
    </div>
  );
}
