import { useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import Loader from '../Loader/Loader';

function Layout({ children }) {
  const { isLoading } = useSelector((state) => state.loaderStatus);
  return (
    <>
      <Navbar>{children}</Navbar>
      {isLoading && <Loader />}
    </>
  );
}

export default Layout;
