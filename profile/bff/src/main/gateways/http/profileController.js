const fs = require('fs');

const assetsFile = `${__dirname}/../../../../assets.json`;

let assets = {};
const assetsManifest = fs.readFileSync(assetsFile, 'utf-8');
assets = JSON.parse(assetsManifest);

const profileController = {
  home: async (req, res) => {

    const content = `
      <div class="jumbotron">
        <h1 class="display-4">Profile</h1>
        <p class="lead">This is the Profile microfrontend.</p>
      </div>
    `;

    res.send({
      html: content,
      scripts: [assets.profile.js],
      styles: [assets.profile.css],
    });
  },
};

module.exports = profileController;
