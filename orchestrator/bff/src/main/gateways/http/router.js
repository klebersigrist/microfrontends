const orchestratorController = require('./orchestratorController');

module.exports = (router) => {
  router.get('/', (req, res) => {
    res.redirect('/dashboard');
  });

  router.get('/*', (req, res) => {
    orchestratorController.home(req, res);
  });

  return router;
};
