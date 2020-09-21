import router from './src/main/router';

import './src/main/stylesheet/theme.scss';

const links = document.querySelectorAll('.nav-link');

links.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    let navigateRoutePath = event.target.href.split('/');
    navigateRoutePath = navigateRoutePath[navigateRoutePath.length - 1];
    router.navigate(navigateRoutePath);
  });
});

router.start();
