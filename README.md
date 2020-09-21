# microfrontends

Starter kit to demonstrate a microfrontend application architecture approach:

Run instructions:

/microfrontend:
npm i
npm pack

/orchestrator:
update package.json with the local path of microfrontend.tgz package
npm i
npm run build
npm start

/dashboard:
update package.json with the local path of microfrontend.tgz package
npm i
npm run build
npm start

/profile:
update package.json with the local path of microfrontend.tgz package
npm i
npm run build
npm start


access: http://localhost:8081
