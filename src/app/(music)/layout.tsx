import React from 'react';

import Player from '@/components/Player';

import { MusicProvider } from './MusicProvider';

const MusicLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => (
	<MusicProvider>
		<div style={{ paddingBottom: '170px' }}>{children}</div>
		<div
			style={{
				position: 'fixed',
				marginTop: 10,
				width: '100%',
				bottom: 0,
				pointerEvents: 'none'
			}}
		>
			<Player />
		</div>
	</MusicProvider>
);

export default MusicLayout;
