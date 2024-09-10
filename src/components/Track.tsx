import { Box, Button, Card, CardContent, CardMedia, Grid2 as Grid, IconButton, Slider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface Sound {
    title: string
    user: {
        username: string
    }
    artwork_url: string
}


interface Props {
    trackid: string
    play: React.Dispatch<React.SetStateAction<string>>
    style?: React.CSSProperties
}

export function Track({ trackid, play, style }: Props) {
    const [widget, setWidget] = useState<any>(undefined)
    const [SC, setSC] = useState<any>(undefined)
    const [sound, setSound] = useState<Sound | undefined>();

    window.addEventListener('load', () => {
        const widgetIframe = document.getElementById(`sc-track-${trackid}`) as any;
        if ('SC' in window && widgetIframe) {
            const SC = window.SC as any
            setWidget(SC.Widget(widgetIframe))
            setSC(SC)
        }

    })

    useEffect(() => {
        if (widget) {
            widget.bind(SC.Widget.Events.READY, () => {
                widget.getCurrentSound((s: any) => {
                    console.log(s)
                    setSound(s as Sound)
                })
            })
        }
    }, [widget])

    return (
        <div className="soundcloud-track" style={style}>
            <Card sx={{ display: 'flex', backgroundColor: 'transparent' }}>
                {sound?.artwork_url && (
                    <CardMedia
                        component="img"
                        sx={{ width: 151 }}
                        image={sound.artwork_url}                    
                    />
                )}
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5" sx={{ color: "whitesmoke" }}>
                            {sound?.title}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{ color: "whitesmoke" }}
                        >
                            {sound?.user.username}
                        </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <Button onClick={() => play(trackid)}>Play</Button>
                    </Box>
                </Box>

            </Card>
            <iframe
                id={`sc-track-${trackid}`}
                allow="autoplay"
                src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackid}&hide_related=true`}
                hidden>
            </iframe>
        </div>
    )
}