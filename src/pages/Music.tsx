import { PlayList } from '../components/PlayList';
import { tracks } from '../conf';

export function Music() {
  return <PlayList tracks={tracks} />;
}
