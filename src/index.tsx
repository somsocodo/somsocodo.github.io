import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { SoundCloud } from './components/SoundCloud';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <SoundCloud 
      trackid= '1565542993'
      style={{width: '100%'}}
      />
  </React.StrictMode>
);
