import microfrontends from 'microfrontends';

import './src/main/stylesheet/dashboard.scss';

microfrontends.create('dashboard', {
  onMount: () => {
    console.log('dashboard fragment mount hook called');
  },

  onDestroy: () => {
    console.log('dashboard fragment destroy hook called');
  },
});
