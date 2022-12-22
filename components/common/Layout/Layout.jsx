import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../Navbar/Navbar';
import Loader from '../Loader/Loader';
import Footer from '../Footer/Footer';

function Layout({ children }) {
  const router = useRouter();

  function startsWithAny(currentPath, pathStringArr) {
    return pathStringArr.map((s) => currentPath.startsWith(s)).includes(true);
  }
  const pageWithFooter = ['/card-wall', '/homepage', '/notification'];
  const { isLoading } = useSelector((state) => state.loaderStatus);
  return (
    <>
      <Head>
        <title>MESHIcian 電子名片商務方案</title>
        <meta
          name="description"
          content="專為名片設計而生的編輯器 || QR Code 掃描快速交換個人名片頁面導流好方便 || 群組化管理名片，人脈掌握一指運籌帷幄"
        />
        <meta
          property="og:description"
          content="專為名片設計而生的編輯器 || QR Code 掃描快速交換個人名片頁面導流好方便 || 群組化管理名片，人脈掌握一指運籌帷幄"
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Navbar />
      {children}

      {startsWithAny(router.pathname, pageWithFooter) && <Footer />}

      {isLoading && <Loader />}
    </>
  );
}

export default Layout;
