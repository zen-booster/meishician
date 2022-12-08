import { FaFolderOpen } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import CardList from '../../components/CardList/CardList';
import BookmarkSidebar from '../../components/BookmarkSidebar';
import cardDataJSON from './data.json';

import { useWindowWide } from '../../hooks/useWindowWide';

export default function Manage() {
  const wide = useWindowWide();
  const cardData = cardDataJSON.data;

  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const handleSidebarActiveClick = () => {
    if (wide < 768) setIsSidebarActive((prev) => !prev);
  };

  useEffect(() => {
    if (wide < 768) setIsSidebarActive(false);
    if (wide >= 768) setIsSidebarActive(true);
  }, [wide]);
  return (
    <main className="relative flex min-h-screen">
      <aside
        className={`${isSidebarActive ? 'block' : 'hidden'} 
        absolute z-30 min-h-screen bg-white p-5 drop-shadow-xl md:static md:basis-2/5 lg:basis-1/4`}
      >
        <BookmarkSidebar />
      </aside>

      <section className="basis-full bg-slate-200 p-5 md:basis-3/5 lg:basis-3/4">
        <div className="text-xl font-bold">預設群組</div>
        <CardList dataArr={cardData} />
      </section>

      <button
        type="button"
        onClick={() => handleSidebarActiveClick()}
        className="fixed bottom-3 right-3 flex h-14 w-14 items-center  justify-center rounded-full bg-white drop-shadow-xl md:hidden"
      >s
        <FaFolderOpen />
      </button>
    </main>
  );
}
