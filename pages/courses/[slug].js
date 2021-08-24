import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Course.module.css";
import { dateFormatLong } from "@/utils/dateFormat.js";
import { useRouter } from "next/router";

export default function CoursePage({ cours }) {
  const router = useRouter();

  const deleteCourse = async (e) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/courses/${cours.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push("/courses");
      }
    }
  };

  return (
    <Layout>
      <div className={styles.course}>
        <div className={styles.controls}>
          <Link href={`/courses/edit/${cours.id}`}>
            <a>
              <FaPencilAlt /> Edit Course
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteCourse}>
            <FaTimes /> Delete Course
          </a>
        </div>

        <span>
          {dateFormatLong(cours.date)} at {cours.time}
        </span>
        <h1>{cours.name}</h1>
        {cours.image && (
          <div className={styles.image}>
            <Image src={cours.image.url} width={960} height={600} />
          </div>
        )}

        <h3>Educator:</h3>
        <p>{cours.educator}</p>
        <h3>Description:</h3>
        <p>{cours.description}</p>

        <Link href="/courses">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/courses`);
  const courses = await res.json();

  const paths = courses.map((cours) => ({
    params: { slug: cours.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/courses/?slug=${slug}`);
  const courses = await res.json();

  return {
    props: {
      cours: courses[0],
    },
    revalidate: 1,
  };
}

