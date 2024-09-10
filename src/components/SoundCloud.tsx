import { Button, Slider } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
    trackid: string;
}

export function SoundCloud({ trackid }: Props) {
    const [widget, setWidget] = useState<any>(undefined)
    const [SC, setSC] = useState<any>(undefined)
    const [loaded, setLoaded] = useState<boolean>(false)
    const [paused, setPaused] = useState<boolean>(true)
    const [time, setTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

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
    
    return (
    <div className="soundcloud-player">
        <Button onClick={play} variant="outlined" disabled={!loaded}>{paused ? 'play' : 'pause'}</Button>
        <Slider value={time} max={duration} onChange={(_, value) => seek(value as number)} aria-label="time-indicator"/>
        <p>{time} | -{duration - time}</p>
        <iframe 
            id='sc-widget' 
            allow="autoplay"
            src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackid}&hide_related=true&visual=false`}
            hidden>
        </iframe>
    </div>
    )
}