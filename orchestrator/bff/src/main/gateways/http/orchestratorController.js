const fs = require('fs');

const title = 'Dojo Microfrontends';
const assetsFile = `${__dirname}/../../../../assets.json`;

let assets = {};
const assetsManifest = fs.readFileSync(assetsFile, 'utf-8');
assets = JSON.parse(assetsManifest);

const orchestratorController = {
  home: async (req, res) => {
    res.send(`
      <html lang="pt-br">
        <head>
          <script defer src="${assets.orchestrator.js}"></script>
          <title>${title}</title>
          <link href="${assets.orchestrator.css}" rel="stylesheet" type="text/css" />
        </head>
        <body>
          <header clas>
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <span class="navbar-brand mb-0 h1">Navigation</span>
                    <div class="navbar-collapse">
                      <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                          <a class="nav-link" href="dashboard">Dashboard</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="profile">Profile</a>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </header>
          <main>
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <div id="router-outlet"></div>
                </div>
              </div>
            </div>
          </main>
        </body>
      </html>
    `);
  },
};

module.exports = orchestratorController;
