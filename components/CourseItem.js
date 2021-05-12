import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/CourseItem.module.css'

export default function CourseItem({ cours }) {
  return (
    <div className={styles.course}>
      <div className={styles.img}>
        <Image
          src={cours.image ? cours.image : '/images/event-default.png'}
          width={170}
          height={100}
        />
      </div>

      <div className={styles.info}>
        <span>
          {cours.date} at {cours.time}
        </span>
        <h3>{cours.name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/courses/${cours.slug}`}>
          <a className='btn'>Details</a>
        </Link>
      </div>
    </div>
  )
}
