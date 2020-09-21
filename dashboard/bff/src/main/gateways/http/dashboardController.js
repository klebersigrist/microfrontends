const fs = require('fs');

const assetsFile = `${__dirname}/../../../../assets.json`;

let assets = {};
const assetsManifest = fs.readFileSync(assetsFile, 'utf-8');
assets = JSON.parse(assetsManifest);

const dashboardController = {
  home: async (req, res) => {

    const content = `
    <div class="jumbotron">
      <h1 class="display-4">Dashboard</h1>
      <p class="lead">This is the Dashboard microfrontend.</p>
    </div>
  `;

    res.send({
      html: content,
      scripts: [assets.dashboard.js],
      styles: [assets.dashboard.css],
    });
  },
};

module.exports = dashboardController;
