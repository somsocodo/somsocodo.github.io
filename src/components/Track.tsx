'use client';

import { Button, Card, Grid2 as Grid, CardMedia, Typography, CircularProgress } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface Sound {
	title: string;
	user: {
		username: string;
	};
	artwork_url: string;
	permalink_url: string;
}

interface Props {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	SC: any;
	trackid: string;
	play: React.Dispatch<React.SetStateAction<string>>;
	playing: boolean;
	style?: React.CSSProperties;
}

const Track = ({ SC, trackid, play, playing, style }: Props) => {
	// eslint-disable-next-line
	const [sound, setSound] = useState<Sound | undefined>();

	useEffect(() => {
		if (SC) {
			const widget = SC.Widget(`sc-track-${trackid}`);
			widget.bind(SC.Widget.Events.READY, () => {
				widget.getCurrentSound((s: Sound) => {
					setSound(s);
				});
			});
		}
	}, [SC, trackid]);

	return (
		<div className="soundcloud-track" style={style}>
			<Card sx={{ backgroundColor: 'transparent' }}>
				<Grid sx={{ display: 'flex', backgroundColor: 'transparent', height: '14vh' }}>
					<Grid size="auto">
						{sound?.artwork_url ? (
							<CardMedia component="img" sx={{ width: '14vh' }} image={sound.artwork_url} />
						) : (
							<CircularProgress sx={{ color: 'rgba(209, 209, 209, 0.774)' }} size="14vh" />
						)}
					</Grid>
					<Grid size="grow" paddingLeft="10px" paddingTop="0.5vh">
						<Typography component="div" fontSize="3vh" sx={{ color: 'whitesmoke' }} noWrap>
							{sound ? sound?.title : '...'}
						</Typography>
						<Typography
							variant="subtitle1"
							component="div"
							fontSize="2vh"
							sx={{ color: 'whitesmoke' }}
							noWrap
						>
							{sound ? sound?.user.username : '...'}
						</Typography>
						<Button onClick={() => play(trackid)} style={{ width: '2vh' }} disabled={!sound || playing}>
							Play
						</Button>
					</Grid>
					<Grid size="grow" maxWidth="15vh">
						<div>
							<a
								href={sound?.permalink_url ? sound?.permalink_url : 'https://soundcloud.com/'}
								style={{
									position: 'absolute',
									right: 0,
									width: '12vh',
									height: '4vh',
									paddingRight: '15vh'
								}}
							>
								<Image
									fill
									objectFit="contain"
									src="https://developers.soundcloud.com/assets/powered_by_white-371bd6967352fcc89673d4c81f7e5661.png"
									alt="Powered by SoundCloud"
								/>
							</a>
						</div>
					</Grid>
				</Grid>
			</Card>

			<iframe
				id={`sc-track-${trackid}`}
				title={`sc-track-${trackid}`}
				allow="autoplay"
				src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackid}&hide_related=true`}
				hidden
			/>
		</div>
	);
};

export default Track;
