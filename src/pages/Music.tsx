import { PlayList } from '../components/PlayList';
import { tracks } from '../data/tracks';

export function Music() {
  return <PlayList tracks={tracks} />;
}
