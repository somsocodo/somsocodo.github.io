import { Button, Grid2 as Grid, Slider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface Sound {
  title: string;
  user: {
    username: string;
  };
}

interface Props {
  trackid: string;
  style?: React.CSSProperties;
}

export function SoundCloud({ trackid }: Props) {
  // eslint-disable-next-line
  const [widget, setWidget] = useState<any>(null);
  // eslint-disable-next-line
  const [SC, setSC] = useState<any>(undefined);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(true);
  const [time, setTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const [sound, setSound] = useState<Sound | undefined>();

  let timer: NodeJS.Timer | null = null;

  useEffect(() => {
    const widgetIframe = document.getElementById('sc-widget' + trackid);
    if ('SC' in window && widgetIframe) {
      // eslint-disable-next-line
      const SC = window.SC as any;
      setWidget(SC.Widget(widgetIframe));
      setSC(SC);
    }
  }, []);

  useEffect(() => {
    if (widget) {
      widget.bind(SC.Widget.Events.READY, () => {
        setLoaded(true);
        widget.getDuration((d: number) => {
          setDuration(Math.round((d / 1000) * 100) / 100);
        });
        widget.getCurrentSound((s: Sound) => {
          setSound(s);
        });
      });
      widget.bind(SC.Widget.Events.PLAY, () => {
        setPaused(false);
      });
      widget.bind(SC.Widget.Events.PAUSE, () => {
        setPaused(true);
      });
    }
  }, [widget]);

  useEffect(() => {
    if (!widget) return;
    if (!paused && !timer) {
      timer = setInterval(() => {
        widget.getPosition((pos: number) => {
          setTime(Math.round((pos / 1000) * 100) / 100);
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [paused]);

  const play = () => {
    if (paused) {
      widget.play();
    } else {
      widget.pause();
    }
  };

  const seek = (pos: number) => {
    widget.seekTo(pos * 1000);
    if (paused) {
      setTime(pos);
    }
  };

  useEffect(() => {
    if (sound && paused) {
      widget.play();
    }
  }, [sound]);

  const formatTime = (value: number) => {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft.toFixed(0)}` : secondLeft.toFixed(0)}`;
  };

  return (
    <div className="soundcloud-player">
      <Grid
        container
        spacing={10}
        style={{
          minHeight: '60px',
          backgroundImage: 'linear-gradient(transparent, #17191a, #17191a)'
        }}
      >
        <Grid size="grow">
          <p style={{ paddingLeft: 10 }}>{formatTime(time)}</p>
        </Grid>
        <Grid size="grow"></Grid>
        <Grid size="grow">
          <p style={{ paddingRight: 10, textAlign: 'right' }}>-{formatTime(duration - time)}</p>
        </Grid>
      </Grid>
      <div style={{ backgroundColor: ' #17191a' }}>
        <Slider
          value={time}
          max={duration}
          onChange={(_, value) => seek(value as number)}
          aria-label="time-indicator"
        />
        <Grid container spacing={1}>
          <Grid size="auto">
            <Button
              style={{ marginLeft: '5px', height: '90%' }}
              onClick={play}
              variant="outlined"
              disabled={!loaded || !trackid}
            >
              {paused ? 'play' : 'pause'}
            </Button>
          </Grid>
          <Grid size="auto">
            <Typography
              component="div"
              variant="h5"
              sx={{ color: 'whitesmoke', marginLeft: '20px' }}
            >
              {sound?.title}
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ color: 'whitesmoke', marginLeft: '20px', paddingBottom: '10px' }}
            >
              {sound?.user.username}
            </Typography>
          </Grid>
          <Grid size="grow"></Grid>
        </Grid>
      </div>
      <iframe
        id={'sc-widget' + trackid}
        allow="autoplay"
        src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackid}&hide_related=true`}
        hidden
      ></iframe>
    </div>
  );
}
