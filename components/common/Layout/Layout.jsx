import { useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Loader from '../Loader/Loader';

function Layout({ children }) {
  const { isLoading } = useSelector((state) => state.loaderStatus);
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      {isLoading && <Loader />}
    </>
  );
}

export default Layout;
