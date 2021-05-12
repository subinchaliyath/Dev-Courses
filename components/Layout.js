import Head from "next/head";
import Header from './Header'
import Footer from './Footer'
import styles from '@/styles/Layout.module.css'

const Layout = ({ title, description, keywords, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
};

Layout.defaultProps={
    title:"Pro_Dev",
    description:"introducing latest development courses",
    keywords:"mern,docker,aws,nginx"
}
export default Layout;
