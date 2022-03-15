// Import Next Image component
import Image from "next/image";

// Import image
import logo from "../../public/krs-logo.webp";

// Import styles
import styles from "./Header.module.css";

export function Header() {
  return (
    <>
      <div className={styles.imageWrapper}>
        <Image alt="The KRS logo" src={logo} />
      </div>
      <h1 className="fs-4 d-none d-sm-block mb-0">Global Domination Planner</h1>
    </>
  );
}
