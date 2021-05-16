import Link from "next/link";
import styles from "@/styles/Header.module.css";
import Search from "./Search";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>Dev Courses</a>
        </Link>
      </div>
      <Search />

      <nav>
        <ul>
          <li>
            <Link href="/courses">
              <a>Courses</a>
            </Link>
          </li>
          <li>
            <Link href="/courses/add">
              <a>Add Course</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
