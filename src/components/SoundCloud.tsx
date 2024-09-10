import { Button, Grid2 as Grid, Slider } from "@mui/material";
import { useEffect, useState } from "react";

interface Sound {
    title: string
    user: {
        username: string
    }
}


interface Props {
    trackid: string
    style?: React.CSSProperties
}

export function SoundCloud({ trackid, style }: Props) {
    const [widget, setWidget] = useState<any>(undefined)
    const [SC, setSC] = useState<any>(undefined)
    const [loaded, setLoaded] = useState<boolean>(false)
    const [paused, setPaused] = useState<boolean>(true)
    const [time, setTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

    const [sound, setSound] = useState<Sound | undefined>();

    let timer: NodeJS.Timer | null = null;

    window.addEventListener('load', ()=>{
        const widgetIframe = document.getElementById('sc-widget') as any;
        if('SC' in window && widgetIframe){
            const SC = window.SC as any
            setWidget(SC.Widget(widgetIframe))
            setSC(SC)
        }

    })

    useEffect(()=>{
        if(widget){
            widget.bind(SC.Widget.Events.READY, ()=>{
                setLoaded(true)
                widget.getDuration((d: number)=>{
                    setDuration(Math.round((d/1000) * 100) / 100)
                })
                widget.getCurrentSound((s: Sound)=>{
                    setSound(s)
                })
            })
            widget.bind(SC.Widget.Events.PLAY, ()=>{
                setPaused(false)
            })
            widget.bind(SC.Widget.Events.PAUSE, ()=>{
                setPaused(true)
            })
        }
    },[widget])
    
    useEffect(()=>{
        if(!widget) return
        if(!paused && !timer){
            timer = setInterval(()=>{
                widget.getPosition((pos: number)=>{
                    setTime(Math.round((pos/1000) * 100) / 100)
                })
            }, 1000)
        }
        return () => { if(timer) clearInterval(timer)};
    },[paused])

    const play = () =>{
        if(paused){
            widget.play()
        } else {
            widget.pause()
        }
    }

    const seek = (pos: any) =>{
        widget.seekTo(pos*1000)
        if(paused){
            setTime(pos)
        }
    }

    const formatTime = (value: number) => {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 10 ? `0${secondLeft.toFixed(0)}` : secondLeft.toFixed(0)}`;
    }
    
    return (
    <div className="soundcloud-player" style={style}>
        <Grid container spacing={10}>
        <Grid size="grow">
            <p style={{paddingLeft: 10}}>{sound?.title}</p>
            <p style={{paddingLeft: 10}}>{sound?.user.username}</p>
        </Grid>
        <Grid size="grow">
            <div style={{
                margin:'0 auto',
                display:'block',
                textAlign:'center'}}>
            
            </div>
        </Grid>
        <Grid size="grow">
            <p  style={{paddingRight: 10, textAlign:'right'}}></p>
        </Grid>
        </Grid>
        <Slider value={time} max={duration} onChange={(_, value) => seek(value as number)} aria-label="time-indicator"/>
        <Grid container spacing={10}>
        <Grid size="grow">
            <p style={{paddingLeft: 10}}>{formatTime(time)}</p>
        </Grid>
        <Grid size="grow">
            <div style={{
                margin:'0 auto',
                display:'block',
                textAlign:'center'}}>
            <Button onClick={play} variant="outlined" disabled={!loaded}>{paused ? 'play' : 'pause'}</Button>
            </div>
        </Grid>
        <Grid size="grow">
            <p  style={{paddingRight: 10, textAlign:'right'}}>-{formatTime(duration - time)}</p>
        </Grid>
        </Grid>
        <iframe 
            id='sc-widget' 
            allow="autoplay"
            src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackid}&hide_related=true`}
            hidden>
        </iframe>
    </div>
    )
}