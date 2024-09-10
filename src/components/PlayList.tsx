import { useEffect, useState } from "react";
import { SoundCloud } from "./SoundCloud"
import { Button } from "@mui/material";
import { Track } from "./Track";

interface Props {
    tracks: string[]
}

export function PlayList({ tracks }: Props) {
    const [track, setTrack] = useState<string>('');

    useEffect(()=>{

    },[track])

    return(
    <div id ='soundcloud-playlist'>
        {tracks.map((id) => {
            return (
                <Track trackid={id} play={setTrack} key={id}/>
            )
        })
        }
        <SoundCloud trackid={track} key={'widget-'+track}/>  
    </div>
    ) 

    
}