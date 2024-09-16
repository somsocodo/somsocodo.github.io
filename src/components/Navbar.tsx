import { HistoryEduRounded, MenuRounded, MusicNoteRounded } from '@mui/icons-material';
import {
  AppBar,
  Chip,
  Drawer,
  Grid2 as Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  rgbToHex
} from '@mui/material';
import { ReactElement, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useWindowDimensions from '../helpers/windowDimensions';

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

export function NavBar() {
  const [secret, setSecret] = useState<number>(0);
  const logocol = rgbToHex(`rgb(255,${255 - secret * 10},${255 - secret * 10})`);
  const handleSecret = () => {
    setSecret(secret + 1);
    if (secret >= 10) {
      setSecret(0);
      navigate('/secret');
    }
  };

  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: '#17191a', height: '30', width: '100%', overflow: 'visible' }}
    >
      <Grid container spacing={'1vw'}>
        <Grid padding={'2vh'} size="auto" alignContent={'center'}>
          <Chip
            label={'somsocodo.github.io'}
            variant="outlined"
            sx={{ color: logocol }}
            onClick={handleSecret}
          />
        </Grid>
        {width > 600 ? (
          routes.map((route) => {
            const tabcol = route.route == location.pathname ? 'whitesmoke' : 'grey';
            return (
              <Grid key={route.label} padding={'2vh'} size="auto" alignContent={'center'}>
                <ListItemButton onClick={() => navigate(route.route)}>
                  <ListItemIcon sx={{ color: tabcol, minWidth: 30 }}>{route.icon}</ListItemIcon>
                  <ListItemText sx={{ color: tabcol }} primary={route.label} />
                </ListItemButton>
              </Grid>
            );
          })
        ) : (
          <>
            <Grid size={'grow'} />

            <div>
              <IconButton sx={{ paddingLeft: 10 }} onClick={toggleDrawer(true)}>
                <MenuRounded fontSize="large" htmlColor="white" />
              </IconButton>
              <Drawer anchor={'right'} open={open} onClose={toggleDrawer(false)}>
                <List sx={{ backgroundColor: '#17191a', height: '100%' }}>
                  {routes.map((route) => {
                    const tabcol = route.route == location.pathname ? 'whitesmoke' : 'grey';
                    return (
                      <ListItem key={route.label} sx={{ color: tabcol }}>
                        <ListItemButton onClick={() => navigate(route.route)}>
                          <ListItemIcon sx={{ color: tabcol, minWidth: 30 }}>
                            {route.icon}
                          </ListItemIcon>
                          <ListItemText primary={route.label} />
                        </ListItemButton>
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
}
