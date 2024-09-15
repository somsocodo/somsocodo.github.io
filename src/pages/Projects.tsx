import {
  Card,
  CardContent,
  Typography,
  Grid2 as Grid,
  Stack,
  Chip,
  Divider,
  Box
} from '@mui/material';
import { Project, projects } from '../data/projects';

export function Projects() {
  console.log(projects);
  return (
    <Box overflow={'auto'}>
      <Grid container direction={'column'} spacing={3} padding={3}>
        {projects.map((project: Project) => {
          return (
            <Grid size={'auto'} key={project.title}>
              <div>
                <Card
                  variant="outlined"
                  sx={{
                    position: 'relative',
                    backgroundColor: '#17191a',
                    outline: '2px solid #26292b'
                  }}
                >
                  <CardContent>
                    <Grid direction={'column'}>
                      <Grid size="auto">
                        <Typography variant="h5" paddingBottom={1} sx={{ color: 'whitesmoke' }}>
                          {project.title}
                        </Typography>
                        <Divider sx={{ bgcolor: 'white', opacity: 0.1 }} />
                        <Typography
                          paddingBottom={3}
                          paddingTop={1}
                          sx={{ color: 'whitesmoke', mb: 1.5 }}
                        >
                          {project.description}
                        </Typography>
                      </Grid>
                      <Grid size="auto">
                        <Stack direction="row" spacing={2} paddingBottom={2} paddingTop={2}>
                          <p style={{ marginTop: 5 }}>Languages: </p>
                          {project.languages.map((lang) => {
                            return (
                              <Chip
                                key={lang}
                                label={lang}
                                variant="outlined"
                                sx={{ color: 'white' }}
                              />
                            );
                          })}
                        </Stack>
                        <Divider sx={{ bgcolor: 'white', opacity: 0.1 }} />
                        <Stack direction="row" spacing={2} paddingBottom={2} paddingTop={2}>
                          <p style={{ marginTop: 5 }}>Technologies: </p>
                          {project.technologies.map((tech) => {
                            return (
                              <Chip
                                key={tech}
                                label={tech}
                                variant="outlined"
                                sx={{ color: 'white' }}
                              />
                            );
                          })}
                        </Stack>
                        <Divider sx={{ bgcolor: 'white', opacity: 0.1 }} />
                        <Stack direction="column" spacing={2} paddingBottom={2} paddingTop={3}>
                          {project.links.map((link) => {
                            return (
                              <a key={link} href={link}>
                                {link}
                              </a>
                            );
                          })}
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
