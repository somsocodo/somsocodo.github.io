import { AppBar, Button, Grid2 as Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function NavBar() {
  const navigate = useNavigate();
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#17191a', height: '10vh' }}>
      <Grid container spacing={10}>
        <Grid padding={'2vh'} size="auto" alignContent={'center'}>
          <Typography component="div" fontSize={'3vh'} sx={{ color: 'whitesmoke' }} noWrap>
            somsocodo.github.io
          </Typography>
        </Grid>
        <Grid padding={'2vh'} size="auto" alignContent={'center'}>
          <Button onClick={() => navigate('/music')} style={{ width: '2vh' }}>
            Music
          </Button>
        </Grid>
        <Grid padding={'2vh'} size="auto" alignContent={'center'}>
          <Button onClick={() => navigate('/projects')} style={{ width: '2vh' }}>
            Projects
          </Button>
        </Grid>
        <Grid size="grow" />
      </Grid>
    </AppBar>
  );
}
