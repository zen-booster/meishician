import Banner from '../components/features/landing-page/Banner';
import Demo from '../components/features/landing-page/Demo';
import Guide from '../components/features/landing-page/Guide';
import Introduction from '../components/features/landing-page/Introduction';
import Solution from '../components/features/landing-page/Solution';

export default function Home() {
  return (
    <>
      <Banner />
      <Solution />
      <Demo />
      <Introduction />
      <Guide />
    </>
  );
}
