'use client';

import Script from 'next/script'
import React, { useEffect, useState } from 'react';

import SoundCloud from './SoundCloud';
import Track  from './Track';


interface Props {
	tracks: string[];
}

const PlayList = ({ tracks }: Props) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [SC, setSC] = useState<any>(undefined);
	const [track, setTrack] = useState<string>('');


	useEffect(() => {}, [track]);

	return (
		<div id="soundcloud-playlist" style={{ paddingBottom: '170px' }}>
			<Script src="soundcloud.js" onLoad={()=>{
				if ('SC' in window) {
					setSC(window.SC)
				}
			}}/>
			{tracks.map((id) => (
				<Track trackid={id} play={setTrack} playing={id === track} key={id} SC={SC}/>
			))}
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
					key={`widget-${track}`}
					style={{
						background: '#1719a'
					}}
					SC={SC}
				/>
			</div>
		</div>
	);
};

export default PlayList;
