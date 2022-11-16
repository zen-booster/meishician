import Navbar from '../components/common/Navbar/Navbar';
import Banner from '../components/page/landing-page/Banner';
import Solution from '../components/page/landing-page/Solution';
import Demo from '../components/page/landing-page/Demo';
import Introduction from '../components/page/landing-page/Introduction';
import Guide from '../components/page/landing-page/Guide';

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
