import Link from "next/link";
import Layout from "@/components/Layout";
import CourseItem from "@/components/CourseItem";
import { API_URL } from "@/config/index";

export default function HomePage({ courses }) {
  return (
    <Layout>
      <h1>Upcoming Courses</h1>
      {courses.length === 0 && <h3>No courses to show</h3>}

      {courses.map((cours) => (
        <CourseItem key={cours.id} cours={cours} />
      ))}

      {courses.length > 0 && (
        <Link href="/courses">
          <a className="btn-secondary">View All courses</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/courses?_sort=date:ASC&_limit=3`);
  const courses = await res.json();

  return {
    props: { courses },
    revalidate: 1,
  };
}
