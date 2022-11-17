import Navbar from '../../components/common/Navbar/Navbar';
import LoginForm from '../../components/page/member/LoginForm';

export default function Login() {
  return (
    <div>
      <Navbar />
      <div className="mt-10 flex items-center justify-center">
        <img
          className="hidden sm:block"
          src="https://memeprod.sgp1.digitaloceanspaces.com/user-wtf/1597328697599.jpg"
          alt="main_image"
        />
        <LoginForm />
      </div>
    </div>
  );
}
