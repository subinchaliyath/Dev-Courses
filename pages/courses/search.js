import qs from 'qs'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '@/components/Layout'
import CourseItem from '@/components/CourseItem'
import { API_URL } from '@/config/index'

export default function SearchPage({ courses }) {
  const router = useRouter()

  return (
    <Layout title='Search Results'>
      <Link href='/courses'>Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {courses.length === 0 && <h3>No courses to show</h3>}

      {courses.map((cours) => (
        <CourseItem key={cours.id} cours={cours} />
      ))}
    </Layout>
  )
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { educator_contains: term },
        { description_contains: term },
      ],
    },
  })
  const res = await fetch(`${API_URL}/courses?${query}`)
  const courses = await res.json()
  console.log({courses});

  return {
    props: { courses },
  }
}