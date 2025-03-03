import React from 'react';

import PlayList from '@/components/PlayList';
import tracks from '@/data/tracks';

const Home = () => <PlayList tracks={tracks} />;

export default Home;
