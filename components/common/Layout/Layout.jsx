import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
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
      <Navbar />
      {children}

      {startsWithAny(router.pathname, pageWithFooter) && <Footer />}

      {isLoading && <Loader />}
    </>
  );
}

export default Layout;
