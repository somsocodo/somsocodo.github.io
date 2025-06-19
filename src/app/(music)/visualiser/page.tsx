'use client';

import { Box, Button, Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { useMusicContext } from '../MusicProvider';
import serverFetch from '@/actions/serverFetch';

const Visualiser = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [widget, setWidget] = useState<any>(undefined);

	const [clientid, setClientid] = useState<string>();
	const [url, setUrl] = useState<string>();

	const { SCInstance: SC } = useMusicContext();

	const trackid = 2031285196;
	const trackurl = `https://api.soundcloud.com/tracks/${trackid}&hide_related=true`;
	const widgeturl = `https://w.soundcloud.com/player/?url=${trackurl}`;

	useEffect(() => {
		const loadStream = async () => {
			const res = await serverFetch(widgeturl);
			console.log(res);
		};
		loadStream();
	}, [widgeturl]);

	useEffect(() => {
		if (SC) {
			setWidget(SC.Widget(`sc-widget-${trackid}`));
		}
	}, [SC, trackid]);

	const handlePlay = () => {
		widget.play();
	};

	return (
		<>
			<Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
				<Paper sx={{ padding: 4 }}>
					<TextField
						label="Client ID"
						variant="outlined"
						fullWidth
						value={clientid || ''}
						onChange={(e) => setClientid(e.target.value)}
						sx={{ marginBottom: 2, backgroundColor: 'white' }}
					/>
					<TextField
						label="SoundCloud URL"
						variant="outlined"
						fullWidth
						value={url || ''}
						onChange={(e) => setUrl(e.target.value)}
						sx={{ marginBottom: 2, backgroundColor: 'white' }}
					/>
					<Button onClick={handlePlay}>Play</Button>
				</Paper>
			</Box>
			<iframe
				id={`sc-widget-${trackid}`}
				title={`sc-widget-${trackid}`}
				allow="autoplay"
				src={widgeturl}
				hidden
			/>
		</>
	);
};

export default Visualiser;
