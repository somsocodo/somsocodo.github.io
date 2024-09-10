import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { SoundCloud } from './components/SoundCloud';
import { PlayList } from './components/PlayList';
import { tracks } from './conf';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <PlayList tracks={tracks}/>
  </React.StrictMode>
);
