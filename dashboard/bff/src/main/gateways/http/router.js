const dashboardController = require('./dashboardController');

module.exports = (router) => {
  router.get('/fragment/dashboard', (req, res) => {
    dashboardController.home(req, res);
  });

  return router;
};
