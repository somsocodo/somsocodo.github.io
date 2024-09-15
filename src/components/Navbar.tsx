import { HistoryEduRounded, MusicNoteRounded } from '@mui/icons-material';
import { AppBar, Button, Grid2 as Grid, ListItemIcon, Menu, MenuItem, SvgIconTypeMap, Typography } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useWindowDimensions from '../helpers/windowDimensions';

interface Route {
  label: string
  route: string
  icon: ReactElement<any, any>
}


const routes: Route[] = [
  {
    label: 'music',
    route: '/music',
    icon: <MusicNoteRounded/>
  },
  {
    label: 'projects',
    route: '/projects',
    icon: <HistoryEduRounded/>
  }
]

export function NavBar() {
  const { height, width } = useWindowDimensions();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#17191a', height: '10vh', width: '100%' }}>
      <Grid container spacing={'1vw'}>
        <Grid padding={'2vh'} size="auto" alignContent={'center'}>
          <Typography component="div" fontSize={'3vh'} sx={{ color: 'whitesmoke' }} noWrap>
            somsocodo.github.io
          </Typography>
        </Grid>
        { width > 600 ? (routes.map((route)=>{
          return (
            <Grid padding={'2vh'} size="auto" alignContent={'center'}>
            <Button href={route.route} onClick={() => navigate('/music')} style={{ width: '2vh' }} endIcon={route.icon}>
              {route.label}
            </Button>
          </Grid>
          )
        })) : (
          <><Grid size={'grow'} />
          <Grid padding={'2vh'} size="auto">
              <div>
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  sx={{marginRight: 0}}
                  
                >
                  Dashboard
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                  sx={{marginRight: 40}}
                >
                 {routes.map((route)=>{
                  return ( 
                  <MenuItem onClick={handleClose}>
                    Profile
                    <ListItemIcon>{route.icon}</ListItemIcon>

                  </MenuItem>)
                 })}
                </Menu>
              </div>
            </Grid></>
        )}
        </Grid>
    </AppBar>
  );
}
