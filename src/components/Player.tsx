'use client';

import { PauseRounded, PlayArrowRounded } from '@mui/icons-material';
import { Grid2 as Grid, IconButton, Slider, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { FastAverageColor } from 'fast-average-color';
import React, { useEffect, useState } from 'react';

import { useMusicContext } from '@/app/(music)/MusicProvider';

interface Waveform {
	height: number;
	samples: number[];
	width: number;
}

interface Sound {
	title: string;
	user: {
		username: string;
	};
	waveform_url: string;
	artwork_url: string;
	colour: string;
}

const Player = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [widget, setWidget] = useState<any>(undefined);
	const [loaded, setLoaded] = useState<boolean>(false);
	const [paused, setPaused] = useState<boolean | undefined>(undefined);
	const [time, setTime] = useState<number>(0);
	const [duration, setDuration] = useState<number>(0);
	const [sound, setSound] = useState<Sound | undefined>();
	const [waveform, setWaveform] = useState<Waveform | undefined>();

	const { SCInstance: SC, trackid } = useMusicContext();

	const widgetURL = `https%3A//api.soundcloud.com/tracks/${trackid}&hide_related=true`;
	const defaultColour = 'white';

	const loadWaveForm = async (url: string) => {
		try {
			fetch(url).then((res) => {
				if (res.ok) {
					res.json().then((wav) => {
						setWaveform(wav as Waveform);
					});
				} else {
					throw new Error(`Response status: ${res.status}`);
				}
			});
		} catch (error) {
			// console.error('Unable to fetch waveform', error);
		}
	};

	const onWidgetReady = React.useCallback(() => {
		setLoaded(true);
		if (!widget) return;
		widget.getDuration((d: number) => {
			setDuration(Math.round((d / 1000) * 100) / 100);
		});
		widget.getCurrentSound((s: Sound) => {
			if (s) {
				loadWaveForm(s.waveform_url);
				const fac = new FastAverageColor();
				fac
					.getColorAsync(s.artwork_url, {
						ignoredColor: [
							[255, 255, 255, 255, 150],
							[0, 0, 0, 255, 150]
						]
					})
					.then((colour) => {
						setSound({ ...s, colour: colour.hex });
					})
					.catch(() => {
						setSound({ ...s, colour: defaultColour });
					});
			}
		});
		widget.play();
	}, [widget, defaultColour]);

	useEffect(() => {
		if (SC && trackid && !widget) {
			setLoaded(false);
			setPaused(undefined);
			setWidget(SC.Widget(`sc-widget-${trackid}`));
			return;
		}

		if (widget) {
			widget.pause();
			setLoaded(false);
			setPaused(undefined);
			setTime(0);
			setWaveform(undefined);
			setSound(undefined);
			widget.load(widgetURL, {
				autoplay: true,
				show_artwork: true,
				callback: onWidgetReady
			});
		}
	}, [SC, trackid, widget, widgetURL, onWidgetReady]);

	useEffect(() => {
		if (widget) {
			widget.bind(SC.Widget.Events.READY, onWidgetReady);
			widget.bind(SC.Widget.Events.PLAY, () => {
				setPaused(false);
			});
			widget.bind(SC.Widget.Events.PAUSE, () => {
				setPaused(true);
			});
		}
	}, [SC?.Widget.Events.PAUSE, SC?.Widget.Events.PLAY, SC?.Widget.Events.READY, widget, onWidgetReady]);

	useEffect(() => {
		let timer: NodeJS.Timeout | undefined;
		if (widget && !paused && !timer) {
			timer = setInterval(() => {
				widget.getPosition((pos: number) => {
					if (loaded) setTime(Math.round((pos / 1000) * 100) / 100);
				});
			}, 1000);
		}
		return () => {
			if (timer) clearInterval(timer);
		};
	}, [paused, widget, loaded]);

	const seek = (pos: number) => {
		widget.seekTo(pos * 1000);
		if (paused) {
			setTime(pos);
		}
	};

	const formatTime = (value: number) => {
		const minute = Math.floor(value / 60);
		const secondLeft = value - minute * 60;
		return `${minute}:${secondLeft < 10 ? `0${secondLeft.toFixed(0)}` : secondLeft.toFixed(0)}`;
	};

	return (
		<div className="soundcloud-player">
			{waveform?.samples && (
				<LineChart
					disableAxisListener
					disableLineItemHighlight
					tooltip={{ trigger: 'none' }}
					leftAxis={null}
					bottomAxis={null}
					margin={{ left: 0, right: 0, bottom: 0, top: 0 }}
					yAxis={[
						{
							colorMap: {
								type: 'continuous',
								min: 0,
								max: waveform.height,
								color: [sound?.colour || defaultColour, 'transparent']
							}
						}
					]}
					series={[
						{
							data: waveform.samples,
							showMark: false,
							area: true
						}
					]}
					height={window.innerHeight / 7}
					sx={{ position: 'absolute', width: '100%', zIndex: -10, top: 15 }}
				/>
			)}
			<div
				style={{
					position: 'absolute',
					width: '100%',
					bottom: 100,
					paddingBottom: 15,
					backgroundImage: 'linear-gradient(transparent, #17191a)'
				}}
			>
				<Grid container spacing={10}>
					<Grid size="grow">
						<p style={{ paddingLeft: 10 }}>{formatTime(time)}</p>
					</Grid>
					<Grid size="grow" />
					<Grid size="grow">
						<p style={{ paddingRight: 15, textAlign: 'right' }}>-{formatTime(duration - time)}</p>
					</Grid>
				</Grid>
			</div>
			<div style={{ backgroundColor: '#17191a', pointerEvents: 'auto' }}>
				<Slider
					value={time}
					max={duration}
					onChange={(_, value) => seek(value as number)}
					sx={{ color: sound?.colour || defaultColour }}
					aria-label="time-indicator"
				/>
				<Grid
					container
					spacing={1}
					style={{
						minHeight: '70px'
					}}
				>
					<Grid size="auto">
						<IconButton
							style={{ left: '10px', bottom: '2.5px', height: '90%' }}
							onClick={() => widget.toggle()}
							disabled={!loaded || !trackid}
						>
							{paused ? (
								<PlayArrowRounded fontSize="large" htmlColor="white" />
							) : (
								<PauseRounded fontSize="large" htmlColor="white" />
							)}
						</IconButton>
					</Grid>
					<Grid size="grow">
						<Typography
							component="div"
							fontSize="3vh"
							sx={{ color: 'whitesmoke', marginLeft: '20px' }}
							noWrap
						>
							{(() => {
								if (sound?.title) return sound.title;
								if (widget) return 'Loading...';
								return 'Select a track.';
							})()}
						</Typography>
						<Typography
							variant="subtitle1"
							component="div"
							fontSize="2vh"
							sx={{ color: 'whitesmoke', marginLeft: '20px', paddingBottom: '10px' }}
							noWrap
						>
							{sound?.user.username ? sound?.user.username : '...'}
						</Typography>
					</Grid>
					<Grid size="auto" justifyContent="center" alignItems="center" />
					<Grid size="auto" />
				</Grid>
			</div>
			{trackid && (
				<iframe
					id={`sc-widget-${trackid}`}
					title={`sc-widget-${trackid}`}
					allow="autoplay"
					src={`https://w.soundcloud.com/player/?url=${widgetURL}`}
					hidden
				/>
			)}
		</div>
	);
};

export default Player;
