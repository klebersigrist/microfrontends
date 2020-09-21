const profileController = require('./profileController');

module.exports = (router) => {
  router.get('/fragment/profile', (req, res) => {
    profileController.home(req, res);
  });

  return router;
};
