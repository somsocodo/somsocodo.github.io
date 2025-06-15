import React from 'react';

import Player from '@/components/Player';

const MusicLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const track = undefined;
	const SC = undefined;

	return (
		<>
			{children}
			<div
				style={{
					position: 'fixed',
					marginTop: 10,
					width: '100%',
					bottom: 0,
					pointerEvents: 'none'
				}}
			>
				<Player trackid={track} key={`widget-${track}`} SC={SC} />
			</div>
		</>
	);
};

export default MusicLayout;
