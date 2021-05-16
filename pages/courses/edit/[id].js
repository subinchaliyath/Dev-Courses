import moment from "moment";
import { FaImage } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";

export default function EditCoursePage({ cour }) {
  const [values, setValues] = useState({
    name: cour.name,
    educator: cour.educator,
    date: cour.date,
    time: cour.time,
    description: cour.description,
  });
  const [imagePreview, setImagePreview] = useState(
    cour.image ? cour.image.formats.thumbnail.url : null
  );
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      toast.error("Please fill in all fields");
    }

    const res = await fetch(`${API_URL}/courses/${cour.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      toast.error("Something Went Wrong");
    } else {
      const cour = await res.json();
      router.push(`/courses/${cour.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const imageUploaded = async (e) => {
    const res = await fetch(`${API_URL}/courses/${cour.id}`);
    const data = await res.json();
    setImagePreview(data.image.formats.thumbnail.url);
    setShowModal(false);
  };
  const scrollToTop = () => {
    setShowModal(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <Layout title="Edit Course">
      <Link href="/courses">Go Back</Link>
      <h1>Edit Course</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Course Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="educator">Educator</label>
            <input
              type="text"
              name="educator"
              id="educator"
              value={values.educator}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={moment(values.date).format("yyyy-MM-DD")}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Couse Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type="submit" value="Update Course" className="btn" />
      </form>

      <h2>Course Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}

      <div>
        <button className="btn-secondary btn-icon" onClick={scrollToTop}>
          <FaImage /> Set Image
        </button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload coursId={cour.id} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/courses/${id}`);
  const cour = await res.json();

  return {
    props: {
      cour,
    },
  };
}
