import Navbar from '../../components/common/Navbar/Navbar';
import Login from '../../components/page/member/Login';

export default function Member() {
  return (
    <div>
      <Navbar />
      <div className="mt-10 flex items-center justify-center">
        <img
          className="hidden sm:block"
          src="https://memeprod.sgp1.digitaloceanspaces.com/user-wtf/1597328697599.jpg"
          alt="main_image"
        />
        <Login />
      </div>
    </div>
  );
}
