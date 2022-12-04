import { useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import Loader from '../Loader/Loader';

function Layout({ children }) {
  const { isLoading } = useSelector((state) => state.loaderStatus);
  // const { isLogin } = useSelector((state) => state.loginStatus);
  return (
    <>
      <Navbar>{children}</Navbar>
      {/* {isLogin && 'hi'} */}
      {isLoading && <Loader />}
    </>
  );
}

export default Layout;
