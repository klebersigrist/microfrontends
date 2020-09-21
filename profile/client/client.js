import microfrontends from 'microfrontends';

import './src/main/stylesheet/profile.scss';

microfrontends.create('profile', {
  onMount: () => {
    console.log('profile fragment mount hook called');
  },

  onDestroy: () => {
    console.log('profile fragment destroy hook called');
  },
});

