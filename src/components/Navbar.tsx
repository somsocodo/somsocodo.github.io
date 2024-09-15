import { HistoryEduRounded, MenuRounded, MusicNoteRounded } from '@mui/icons-material';
import {
  AppBar,
  Drawer,
  Grid2 as Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
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
          <Typography component="div" sx={{ color: 'whitesmoke' }} noWrap>
            somsocodo.github.io
          </Typography>
        </Grid>
        {width > 600 ? (
          routes.map((route) => {
            return (
              <Grid key={route.label} padding={'2vh'} size="auto" alignContent={'center'}>
                <ListItemButton
                  href={route.route}
                  onClick={() => {
                    navigate(route.route);
                  }}
                >
                  <ListItemIcon sx={{ color: 'whitesmoke', minWidth: 30 }}>
                    {route.icon}
                  </ListItemIcon>
                  <ListItemText primary={route.label} />
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
                    return (
                      <ListItem key={route.label} sx={{ color: 'whitesmoke' }}>
                        <ListItemButton
                          href={route.route}
                          onClick={() => {
                            navigate(route.route);
                          }}
                        >
                          <ListItemIcon sx={{ color: 'whitesmoke', minWidth: 30 }}>
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
