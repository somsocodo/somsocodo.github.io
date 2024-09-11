import {
  Button,
  Card,
  Grid2 as Grid,
  CardMedia,
  Typography,
  CircularProgress
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface Sound {
  title: string;
  user: {
    username: string;
  };
  artwork_url: string;
  permalink_url: string;
}

interface Props {
  trackid: string;
  play: React.Dispatch<React.SetStateAction<string>>;
  playing: boolean;
  style?: React.CSSProperties;
}

export function Track({ trackid, play, playing, style }: Props) {
  // eslint-disable-next-line
  const [widget, setWidget] = useState<any>(undefined);
  // eslint-disable-next-line
  const [SC, setSC] = useState<any>(undefined);
  const [sound, setSound] = useState<Sound | undefined>();
  const location = useLocation();

  useEffect(() => {
    const widgetIframe = document.getElementById(`sc-track-${trackid}`);
    if ('SC' in window && widgetIframe) {
      // eslint-disable-next-line
      const SC = window.SC as any;
      setWidget(SC.Widget(widgetIframe));
      setSC(SC);
    }
  }, [location]);

  useEffect(() => {
    if (widget) {
      widget.bind(SC.Widget.Events.READY, () => {
        console.log('ready');
        widget.getCurrentSound((s: Sound) => {
          setSound(s);
        });
      });
    }
  }, [widget]);

  useEffect(() => {
    console.log(sound);
  }, [sound]);

  return (
    <div className="soundcloud-track" style={style}>
      <Card sx={{ backgroundColor: 'transparent' }}>
        <Grid sx={{ display: 'flex', backgroundColor: 'transparent', height: '14vh' }}>
          <Grid size="auto">
            {sound?.artwork_url ? (
              <CardMedia component="img" sx={{ width: '14vh' }} image={sound.artwork_url} />
            ) : (
              <CircularProgress size={'14vh'} />
            )}
          </Grid>
          <Grid size="grow" paddingLeft={'10px'} paddingTop={'0.5vh'}>
            <Typography component="div" fontSize={'3vh'} sx={{ color: 'whitesmoke' }} noWrap>
              {sound ? sound?.title : '...'}
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              fontSize={'2vh'}
              sx={{ color: 'whitesmoke' }}
              noWrap
            >
              {sound ? sound?.user.username : '...'}
            </Typography>
            <Button
              onClick={() => play(trackid)}
              style={{ width: '2vh' }}
              disabled={!sound || playing}
            >
              Play
            </Button>
          </Grid>
          <Grid size="grow" maxWidth={'15vh'}>
            <a href={sound?.permalink_url ? sound?.permalink_url : 'https://soundcloud.com/'}>
              <img
                style={{
                  position: 'absolute',
                  right: 0,
                  paddingTop: 10,
                  paddingRight: 20,
                  width: '12vh'
                }}
                src="https://developers.soundcloud.com/assets/powered_by_white-371bd6967352fcc89673d4c81f7e5661.png"
              />
            </a>
          </Grid>
        </Grid>
      </Card>

      <iframe
        id={`sc-track-${trackid}`}
        allow="autoplay"
        src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackid}&hide_related=true`}
        hidden
      ></iframe>
    </div>
  );
}
