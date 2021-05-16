import Layout from "@/components/Layout";
import CourseItem from "@/components/CourseItem";
import Pagination from "@/components/Pagination";
import { API_URL, PER_PAGE } from "@/config/index";

export default function CoursePage({ courses, page, total }) {
  return (
    <Layout>
      <h1>Courses</h1>
      {courses.length === 0 && <h3>No courses to show</h3>}

      {courses.map((cours) => (
        <CourseItem key={cours.id} cours={cours} />
      ))}
      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetch total/count
  const totalRes = await fetch(`${API_URL}/courses/count`);
  const total = await totalRes.json();

  // Fetch events
  const courseRes = await fetch(
    `${API_URL}/courses?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const courses = await courseRes.json();

  return {
    props: { courses, page: +page, total },
  };
}
