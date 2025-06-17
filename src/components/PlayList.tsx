'use client';

import React from 'react';

import { useMusicContext } from '@/app/(music)/MusicProvider';

import Track from './Track';

interface Props {
	tracks: string[];
}

const PlayList = ({ tracks }: Props) => {
	const { trackid } = useMusicContext();

	return (
		<div id="soundcloud-playlist">
			{tracks.map((id) => (
				<Track trackid={id} playing={id === trackid} key={id} />
			))}
		</div>
	);
};

export default PlayList;
