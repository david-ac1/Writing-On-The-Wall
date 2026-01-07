import Bookshelf from '@/components/Bookshelf';
import MusicFooter from '@/components/MusicFooter';
import { works } from '@/lib/works';

export default function Home() {
  return (
    <>
      <Bookshelf works={works} />
      <MusicFooter />
    </>
  );
}
