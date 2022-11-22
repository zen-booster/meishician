import Navbar from '../components/common/Navbar/Navbar';
import Banner from '../components/features/landing-page/Banner';
import Solution from '../components/features/landing-page/Solution';
import Demo from '../components/features/landing-page/Demo';
import Introduction from '../components/features/landing-page/Introduction';
import Guide from '../components/features/landing-page/Guide';

export default function Home() {
  return (
    <div>
      <Navbar />
      <Banner />
      <Solution />
      <Demo />
      <Introduction />
      <Guide />
    </div>
  );
}
