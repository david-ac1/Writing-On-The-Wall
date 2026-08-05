import Bookshelf from '@/components/Bookshelf';
import MusicFooter from '@/components/MusicFooter';
import PocketFooter from '@/components/PocketFooter';
import { works } from '@/lib/works';

export default function Home() {
  const narrativeWorks = works.filter(work => work.category === 'Witness');

  return (
    <>
      <Bookshelf works={narrativeWorks} />
      <PocketFooter works={works} />
      <MusicFooter />
    </>
  );
}
