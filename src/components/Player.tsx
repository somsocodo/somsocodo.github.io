'use client';

import { PauseRounded, PlayArrowRounded } from '@mui/icons-material';
import { Grid2 as Grid, IconButton, Slider, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { FastAverageColor } from 'fast-average-color';
import React, { useEffect, useRef, useState } from 'react';

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

interface Props {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	SC: any;
	trackid: string | undefined;
}

const Player = ({ SC, trackid }: Props) => {
	const [loaded, setLoaded] = useState<boolean>(false);
	const [paused, setPaused] = useState<boolean | undefined>(undefined);
	const [time, setTime] = useState<number>(0);
	const [duration, setDuration] = useState<number>(0);

	const [sound, setSound] = useState<Sound | undefined>();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [widget, setWidget] = useState<any>(undefined);
	const [waveform, setWaveform] = useState<Waveform | undefined>();

	const timer = useRef<ReturnType<typeof setInterval> | null>(null);
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

	useEffect(() => {
		if (SC && trackid) {
			setWidget(SC.Widget(`sc-widget-${trackid}`));
		}
	}, [SC, trackid]);

	useEffect(() => {
		if (widget) {
			widget.bind(SC.Widget.Events.READY, () => {
				setLoaded(true);
				widget.getDuration((d: number) => {
					setDuration(Math.round((d / 1000) * 100) / 100);
				});
				widget.getCurrentSound((s: Sound) => {
					if (s) {
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
			});
			widget.bind(SC.Widget.Events.PLAY, () => {
				setPaused(false);
			});
			widget.bind(SC.Widget.Events.PAUSE, () => {
				setPaused(true);
			});
		}
	}, [SC?.Widget.Events.PAUSE, SC?.Widget.Events.PLAY, SC?.Widget.Events.READY, widget]);

	useEffect(() => {
		if (widget && !paused && !timer.current) {
			timer.current = setInterval(() => {
				widget.getPosition((pos: number) => {
					setTime(Math.round((pos / 1000) * 100) / 100);
				});
			}, 1000);
		}
		return () => {
			if (timer.current) timer.current = null;
		};
	}, [paused, widget]);

	const play = () => {
		if (paused) {
			widget.play();
		} else {
			widget.pause();
		}
	};

	const seek = (pos: number) => {
		widget.seekTo(pos * 1000);
		if (paused) {
			setTime(pos);
		}
	};

	useEffect(() => {
		if (sound && paused === undefined) {
			widget.play();
			loadWaveForm(sound.waveform_url);
		}
	}, [paused, sound, widget]);

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
					paddingBottom: 10,
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
							onClick={play}
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
							{sound?.title ? sound?.title : 'Select a track.'}
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
					src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackid}&hide_related=true`}
					hidden
				/>
			)}
		</div>
	);
};

export default Player;
