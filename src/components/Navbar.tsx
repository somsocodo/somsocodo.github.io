'use client';

import { HistoryEduRounded, MenuRounded, MusicNoteRounded } from '@mui/icons-material';
import {
	AppBar,
	Chip,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	IconButton,
	Drawer,
	ListItem
} from '@mui/material';
import { Grid, rgbToHex } from '@mui/system';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactElement, useState } from 'react';

import useWindowDimensions from '@/helpers/windowDimensions';

interface Route {
	label: string;
	route: string;
	icon: ReactElement;
}

const routes: Route[] = [
	{
		label: 'music',
		route: '/music',
		icon: <MusicNoteRounded />
	},
	{
		label: 'projects',
		route: '/projects',
		icon: <HistoryEduRounded />
	}
];

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const [secret, setSecret] = useState<number>(0);

	const pathname = usePathname();
	const { width } = useWindowDimensions();

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};

	const handleSecret = () => {
		if (secret < 10) {
			setSecret(secret + 1);
			return;
		}
		setSecret(0);
	};

	return (
		<AppBar
			position="sticky"
			sx={{ backgroundColor: '#17191a', maxHeight: '30', width: '100%', overflow: 'visible' }}
		>
			<Grid container spacing="1vw">
				<Grid padding="2vh" size="auto" alignContent="center">
					<Link href={secret < 10 ? pathname : '/secret'} style={{ textDecoration: 'none' }}>
						<Chip
							label="somsocodo.github.io"
							variant="outlined"
							sx={{ color: rgbToHex(`rgb(255,${255 - secret * 20},${255 - secret * 20})`) }}
							onClick={handleSecret}
						/>
					</Link>
				</Grid>
				{width > 600 ? (
					routes.map((route) => {
						const tabcol = route.route === pathname ? 'whitesmoke' : 'grey';
						return (
							<Grid key={route.label} padding="2vh" size="auto" alignContent="center">
								<Link href={route.route} style={{ textDecoration: 'none' }}>
									<ListItemButton>
										<ListItemIcon sx={{ color: tabcol, minWidth: 30 }}>{route.icon}</ListItemIcon>
										<ListItemText sx={{ color: tabcol }} primary={route.label} />
									</ListItemButton>
								</Link>
							</Grid>
						);
					})
				) : (
					<>
						<Grid size="grow" />

						<div>
							<IconButton sx={{ paddingLeft: 10 }} onClick={toggleDrawer(true)}>
								<MenuRounded fontSize="large" htmlColor="white" />
							</IconButton>
							<Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
								<List sx={{ backgroundColor: '#17191a', height: '100%' }}>
									{routes.map((route) => {
										const tabcol = route.route === pathname ? 'whitesmoke' : 'grey';
										return (
											<ListItem key={route.label} sx={{ color: tabcol }}>
												<Link href={route.route} style={{ textDecoration: 'none' }}>
													<ListItemButton>
														<ListItemIcon sx={{ color: tabcol, minWidth: 30 }}>{route.icon}</ListItemIcon>
														<ListItemText primary={route.label} />
													</ListItemButton>
												</Link>
											</ListItem>
										);
									})}
								</List>
							</Drawer>
						</div>
					</>
				)}
			</Grid>
		</AppBar>
	);
};

export default Navbar;
