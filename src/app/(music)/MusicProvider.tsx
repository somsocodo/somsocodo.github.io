'use client';

import Script from 'next/script';
import React, { createContext, useState, ReactNode, useMemo, useContext } from 'react';

const MusicContext = createContext<
	| {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			SCInstance: any | undefined;
			trackid: string | undefined;
			setTrackid: React.Dispatch<React.SetStateAction<string | undefined>>;
	  }
	| undefined
>(undefined);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [SCInstance, setSCInstance] = useState<any | undefined>(undefined);
	const [trackid, setTrackid] = useState<string | undefined>();

	const contextValue = useMemo(
		() => ({ SCInstance, trackid, setTrackid }),
		[SCInstance, trackid, setTrackid]
	);

	return (
		<>
			<Script
				src="soundcloud.js"
				onLoad={() => {
					if ('SC' in window) {
						setSCInstance(window.SC);
					}
				}}
			/>
			<MusicContext.Provider value={contextValue}>{children}</MusicContext.Provider>
		</>
	);
};

export const useMusicContext = () => {
	const context = useContext(MusicContext);
	if (context === undefined) {
		throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
	}
	return context;
};
