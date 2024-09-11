import { useEffect, useState } from 'react';
import { SoundCloud } from './SoundCloud';
import { Track } from './Track';

interface Props {
  tracks: string[];
}

export function PlayList({ tracks }: Props) {
  const [track, setTrack] = useState<string>('');

  useEffect(() => {}, [track]);

  return (
    <div id="soundcloud-playlist" style={{ paddingBottom: '170px' }}>
      {tracks.map((id) => {
        return <Track trackid={id} play={setTrack} playing={id == track} key={id} />;
      })}
      <div
        style={{
          position: 'fixed',
          marginTop: 10,
          width: '100%',
          bottom: 0,
          pointerEvents: 'none'
        }}
      >
        <SoundCloud
          trackid={track}
          key={'widget-' + track}
          style={{
            background: '#1719a'
          }}
        />
      </div>
    </div>
  );
}
