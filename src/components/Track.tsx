import { Button, Card, Grid2 as Grid, CardMedia, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

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
  style?: React.CSSProperties;
}

export function Track({ trackid, play, style }: Props) {
  // eslint-disable-next-line
  const [widget, setWidget] = useState<any>(undefined);
  // eslint-disable-next-line
  const [SC, setSC] = useState<any>(undefined);
  const [sound, setSound] = useState<Sound | undefined>();

  window.addEventListener('load', () => {
    const widgetIframe = document.getElementById(`sc-track-${trackid}`);
    if ('SC' in window && widgetIframe) {
      // eslint-disable-next-line
      const SC = window.SC as any;
      setWidget(SC.Widget(widgetIframe));
      setSC(SC);
    }
  });

  useEffect(() => {
    if (widget) {
      widget.bind(SC.Widget.Events.READY, () => {
        widget.getCurrentSound((s: Sound) => {
          setSound(s);
        });
      });
    }
  }, [widget]);

  return (
    <div className="soundcloud-track" style={style}>
      <Card sx={{ backgroundColor: 'transparent' }}>
        <Grid sx={{ display: 'flex', backgroundColor: 'transparent', height: '14vh' }}>
          <Grid size="auto">
            {sound?.artwork_url ? (
              <CardMedia component="img" sx={{ width: '14vh' }} image={sound.artwork_url} />
            ) : (
              <CardMedia
                component="img"
                sx={{ width: '14vh' }}
                image={
                  'https://developers.soundcloud.com/assets/powered_by_white-371bd6967352fcc89673d4c81f7e5661.png'
                }
              />
            )}
          </Grid>
          <Grid size="grow">
            <div style={{ paddingLeft: '10' }}>
              <Typography component="div" fontSize={'3vh'} sx={{ color: 'whitesmoke' }} noWrap>
                {sound?.title}
              </Typography>
              <Typography
                variant="subtitle1"
                component="div"
                fontSize={'2vh'}
                sx={{ color: 'whitesmoke' }}
                noWrap
              >
                {sound?.user.username}
              </Typography>
              <Button onClick={() => play(trackid)} style={{ width: '2vh' }}>
                Play
              </Button>
            </div>
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
