import styles from "./main.module.css";
import DropdownMenu from "./DropdownMenu";
import logo from "../../../../public/logo.png"
import Image from "next/image"
import Link from "next/link"

export default function Topbar() {
  return (
    <div className={styles.topbar}>
      <div className={styles.logo}>
        <Link href="../">
        <Image src={logo} layout="fill" />
        </Link>
      </div>
      <div className={styles.title}>Stats Overview</div>
      <DropdownMenu />
    </div>
  );
}
