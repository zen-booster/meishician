import Navbar from '../../../components/common/Navbar/Navbar';
import ResetForm from '../../../components/features/member/ResetForm';

export default function Reset() {
  return (
    <div>
      <Navbar />
      <div className="mt-10 flex items-center justify-center">
        <img
          className="hidden sm:block"
          src="https://memeprod.sgp1.digitaloceanspaces.com/user-wtf/1597328697599.jpg"
          alt="main_image"
        />
        <ResetForm />
      </div>
    </div>
  );
}
