import Microfrontends from 'microfrontends';

const routes = [
  {
    path: 'dashboard',
    title: 'Painel',
    module: {
      name: 'dashboard',
      host: 'http://localhost:8082',
      path: '/fragment/dashboard',
    },
  },
  {
    path: 'profile',
    title: 'Perfil',
    module: {
      name: 'profile',
      host: 'http://localhost:8083',
      path: '/fragment/profile',
    },
  },
];

let currentRoute;

const router = {
  loadCurrentRoute: async () => {
    let currentPath = window.location.pathname.split('/');
    currentPath = currentPath[currentPath.length - 1];

    const currentRoute = routes.find(route => route.path === currentPath);

    document.title = currentRoute.title;

    try {
      await Microfrontends.load(currentRoute.module, document.getElementById('router-outlet'));
    } catch(error) {
      console.error('Error loading module');
    }
  },

  navigate: async (path) => {
    const nextRoute = routes.find(route => route.path === path);

    if (nextRoute && (nextRoute !== currentRoute)) {
      if (currentRoute) {
        Microfrontends.destroy(currentRoute.module.name);
      }

      window.history.pushState({}, nextRoute.title, `/${nextRoute.path}`);
      document.title = nextRoute.title;
      currentRoute = nextRoute;

      try {
        await Microfrontends.load(currentRoute.module, document.getElementById('router-outlet'));
      } catch(error) {
        console.error('Error loading module');
      }
    }
  },

  start: function() {
    window.addEventListener('popstate', this.loadCurrentRoute);
    this.loadCurrentRoute();
  }
};

export default router;
