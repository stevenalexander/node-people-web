# Node People Web

[![BuildStatus](https://travis-ci.org/stevenalexander/node-people-web.svg?branch=master)](https://travis-ci.org/stevenalexander/node-people-web?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NSP Status](https://nodesecurity.io/orgs/moj-noms-apvs/projects/fa3d432e-2c5f-48d0-9a64-61b339699278/badge)](https://nodesecurity.io/orgs/moj-noms-apvs/projects/fa3d432e-2c5f-48d0-9a64-61b339699278)

Simple [Express](https://expressjs.com/) People HTML application using [node-people-api](https://github.com/stevenalexander/node-people-api) and [node-pet-api](https://github.com/stevenalexander/node-pet-api) for data.

[node-pet-api](https://github.com/stevenalexander/node-pet-api) is an optional dependency which if unavailable means the user cannot submit a pet response when creating a person.

Using as part of testing various build/containerisation PoCs.

## Requires

* [Node](https://nodejs.org/en/)
* [Docker](https://www.docker.com/) (optional)

## Run

```
npm install

# available http://localhost:3000
npm start
```

### Run in container

```
# Spin up PostGres, node-people-api, node-pet-api and node-people-web containers
docker-compose up
```

## Test

Unit tests

```
npm test
```

e2e tests running with selenium standalone

```
# requires running application at http://localhost:3000
./node_modules/.bin/gulp e2e
```

e2e tests running via [saucelabs](https://saucelabs.com) (runs tests on Firefox and IE8)

```
export NODE_PEOPLE_WEB_SAUCE_USERNAME='MY_USERNAME'
export NODE_PEOPLE_WEB_SAUCE_ACCESS_KEY='MY_KEY'

./node_modules/.bin/wdio test/wdio.conf.sauce.js
```

## Links

* [Saucelabs blog with link to create free account for open source project](https://saucelabs.com/blog/Announcing-Open-Sauce-free-unlimited-testing-for-Open-Source-projects)
* [Webdriver.io saucelab documentation](http://webdriver.io/guide/services/sauce.html)
* [Saucelabs Platform Configurator](https://wiki.saucelabs.com/display/DOCS/Platform+Configurator#/)
* [Node Security Platform](https://nodesecurity.io/)
